import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MarcaModule } from './modulos/marca/marca.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { FiltroDeExcecaoGlobal } from './recursos/filtros/filtro-de-excecao-global';
import { APP_FILTER } from '@nestjs/core';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { VeiculoModule } from './modulos/veiculo/veiculo.module';
import { AutenticacaoModule } from './modulos/autenticacao/autenticacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    UsuarioModule,
    MarcaModule,
    VeiculoModule,
    AutenticacaoModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoGlobal,
    }
  ],
})
export class AppModule {} 
