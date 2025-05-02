import { MarcaService } from './marca.service';
import { MarcaEntity } from './marca.entity';
import { MarcaController } from './marca.controller';
import { VeiculoModule } from '../veiculo/veiculo.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MarcaEntity]),forwardRef(() => VeiculoModule)],
  controllers: [MarcaController],
  providers: [MarcaService],
  exports: [MarcaService]
})
export class MarcaModule {}
 