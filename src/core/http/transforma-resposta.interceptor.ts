import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { map } from 'rxjs';
import { NestResponse } from './nest-response';

@Injectable()
export class TransformaRespostaInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((respostaDoControlador: NestResponse) => {
        if (respostaDoControlador instanceof NestResponse) {
          const contexto = context.switchToHttp();
          const response = contexto.getResponse();
          const { status, headers, body } = respostaDoControlador;

          const nomesDosCabecalhos = Object.getOwnPropertyNames(headers);

          nomesDosCabecalhos.forEach((nomeDoCabecalho) => {
            const valorDoCabecalho = headers[nomeDoCabecalho];

            this.httpAdapter.setHeader(
              response,
              nomeDoCabecalho,
              valorDoCabecalho,
            );
          });

          this.httpAdapter.status(response, status);

          return body;
        }

        return new NestResponse(respostaDoControlador);
      }),
    );
  }
}
