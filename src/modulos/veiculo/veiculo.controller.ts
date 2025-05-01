import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AtualizaVeiculoDTO } from './dto/AtualizaVeiculo.dto';
import { CriaVeiculoDTO } from './dto/CriaVeiculo.dto';
import { VeiculoService } from './veiculo.service';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('veiculos')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post()
  public async criaVeiculo(@Body() dadosVeiculo: CriaVeiculoDTO) {
    console.log('dadosVeiculo:', dadosVeiculo);

    const veiculoCadastrado = await this.veiculoService.criaVeiculo(
      dadosVeiculo,
    );

    return veiculoCadastrado;
  }

  @Get()
  public async obtemVeiculos() {
    //return await this.veiculoService.obtemVeiculos();
    const veiculos = await this.veiculoService.obtemVeiculos();
    return veiculos;
  }

  @Get('/:id')
  public async obtemVeiculo(@Param('id') id: string) {
    const veiculoSalvo = await this.veiculoService.obtemVeiculo(id);

    return veiculoSalvo;
  }

  @Get('/marca/:id')
  public async obtemVeiculosPorMarca(@Param('id') marcaId: string) {
    const veiculos = await this.veiculoService.obtemVeiculosPorMarca(marcaId);

    return veiculos;
  }

  @Put(':id')
  async atualizaVeiculo(
    @Param('id') veiculoId: string,
    @Body() dadosDeAtualizacao: AtualizaVeiculoDTO,
  ) {
    return this.veiculoService.atualizaVeiculo(veiculoId, dadosDeAtualizacao);
  }

  @Delete('/:id')
  async excluiVeiculo(@Param('id') id: string) {
    await this.veiculoService.excluiVeiculo(id);
  }
}
