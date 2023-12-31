import { Module } from '@nestjs/common';
import { IsNomeDeUsuarioUnicoConstraint } from './is-nome-de-usuario-unico.validator';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [IsNomeDeUsuarioUnicoConstraint, UsuarioService],
})
export class UsuarioModule {}
