import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from 'src/modulos/usuario/usuario.module';
 
@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: 'SEGREDO_JWT',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
})
export class AutenticacaoModule {}
