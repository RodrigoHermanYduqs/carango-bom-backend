import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MarcaService } from './marca.service';
import { AtualizaMarcaDto } from './dto/AtualizaMarca.dto';
import { CriaMarcaDTO } from './dto/CriaMarca.dto';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('marcas')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @Post()
  async criaMarca(
    @Body() dadosDaMarca: CriaMarcaDTO,
  ) {
    const marca = await this.marcaService.criaMarca(dadosDaMarca);

    return {
      marca,
    };
  }

  @Get()
  async obtemMarcas() {
    const marcas = await this.marcaService.obtemMarcas();

    return marcas;
  }

  @Get('/:id')
  public async obtemMarca(@Param('id') id: string) {
    const marca = await this.marcaService.obtemMarca(id);

    return marca;
  }

  @Put(':id')
  async atualizaMarca(
    @Param('id') marcaId: string,
    @Body() dadosDeAtualizacao: AtualizaMarcaDto,
  ) {
    return await this.marcaService.atualizaMarca(marcaId, dadosDeAtualizacao);
  }

  @Delete(':id')
  async excluiMarca(
    @Param('id') marcaId: string
  ) {
    await this.marcaService.excluiMarca(marcaId);
  }
}
 