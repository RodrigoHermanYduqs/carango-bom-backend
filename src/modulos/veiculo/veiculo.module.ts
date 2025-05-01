import { Module } from '@nestjs/common';
import { VeiculoController } from './veiculo.controller';
import { VeiculoEntity } from './veiculo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoService } from './veiculo.service';
import { MarcaModule } from '../marca/marca.module';

@Module({
  imports: [TypeOrmModule.forFeature([VeiculoEntity]), MarcaModule],
  controllers: [VeiculoController],
  providers: [VeiculoService],
})
export class VeiculoModule {}
