import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  private usuarios: Usuario[] = [
    {
      id: 1,
      nomeDeUsuario: 'joao',
      email: 'joao@email.com',
      senha: '123456',
      nomeCompleto: 'João da Silva',
      dataDeEntrada: new Date(),
    },
  ];

  public cria(usuario: Usuario): Usuario {
    this.usuarios.push(usuario);

    return usuario;
  }

  public buscaPorNomeDeUsuario(nomeDeUsuario: string): Usuario {
    const usuarioEncontrado = this.usuarios.find(
      (usuario) => usuario.nomeDeUsuario === nomeDeUsuario,
    );

    return usuarioEncontrado;
  }
}
