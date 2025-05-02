import { forwardRef, Module } from '@nestjs/common';
import { VeiculoEntity } from './veiculo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoController } from './veiculo.controller';
import { VeiculoService } from './veiculo.service';
import { MarcaModule } from '../marca/marca.module';

@Module({
  imports: [TypeOrmModule.forFeature([VeiculoEntity]), forwardRef(() => MarcaModule)],
  controllers: [VeiculoController],
  providers: [VeiculoService],
  exports: [VeiculoService]
})
export class VeiculoModule {}