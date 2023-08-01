import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Injectable()
@ValidatorConstraint()
export class IsNomeDeUsuarioUnicoConstraint
  implements ValidatorConstraintInterface
{
  constructor(private usuarioService: UsuarioService) {}

  validate(nomeDeUsuario: string): boolean {
    const usuarioEncontrado =
      this.usuarioService.buscaPorNomeDeUsuario(nomeDeUsuario);

    return !usuarioEncontrado;
  }
}

export function IsNomeDeUsuarioUnico(validationOptions?: ValidationOptions) {
  return function (object: Usuario, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsNomeDeUsuarioUnicoConstraint,
    });
  };
}
