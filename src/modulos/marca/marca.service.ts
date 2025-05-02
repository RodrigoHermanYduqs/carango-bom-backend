/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriaMarcaDTO } from './dto/CriaMarca.dto';
import { AtualizaMarcaDto } from './dto/AtualizaMarca.dto';
import { MarcaEntity } from './marca.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VeiculoService } from '../veiculo/veiculo.service';

@Injectable()
export class MarcaService {
  
  constructor(
    @InjectRepository(MarcaEntity)
    private readonly marcaRepository: Repository<MarcaEntity>,
    @Inject(forwardRef(() => VeiculoService)) private readonly veiculoService: VeiculoService
  ) {}

  public async obtemMarcas(): Promise<MarcaEntity[]> {
    return this.marcaRepository.findBy({});
  }

  async obtemMarca(id: string) {
    const marca = await this.buscaMarcaPorId(id);

    return marca;
  }

  public async criaMarca(dadosDaMarca: CriaMarcaDTO): Promise<MarcaEntity> {
    const marcaExistente = await this.marcaRepository.findOne({ where: { nome: dadosDaMarca.nome } });

    if (marcaExistente)
      throw new ConflictException('Já existe uma marca com esse nome');

    const marcaEntity = new MarcaEntity();
    marcaEntity.nome = dadosDaMarca.nome;
    
    const marcaCriada = await this.marcaRepository.save(marcaEntity);
    return marcaCriada;
  }

  public async atualizaMarca(id: string, dto: AtualizaMarcaDto): Promise<MarcaEntity> {
    const marca = await this.buscaMarcaPorId(id);

    marca.nome = dto.nome;

    return this.marcaRepository.save(marca);
  }

  public async excluiMarca(id: string) {

    const veiculos = await this.veiculoService.obtemVeiculosPorMarca(id);

    if (veiculos.length > 0)
    {
      throw new ConflictException('Existem veículos cadastrados dessa marca');
    }

    await this.buscaMarcaPorId(id);

    await this.marcaRepository.delete({ id });
  }

  public async buscaMarcaPorId(id: string): Promise<MarcaEntity> {

    const marca = await this.marcaRepository.findOneBy({ id });

    if (marca === null) {
      throw new NotFoundException('A marca não foi encontrada');
    }

    return marca;
  }
}
