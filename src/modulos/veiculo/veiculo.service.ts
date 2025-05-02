import { VeiculoDTO } from './dto/Veiculo.dto';
import { VeiculoEntity } from './veiculo.entity';
import { Repository } from 'typeorm';
import { AtualizaVeiculoDTO } from './dto/AtualizaVeiculo.dto';
import { CriaVeiculoDTO } from './dto/CriaVeiculo.dto';
import { MarcaService } from '../marca/marca.service';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VeiculoService {
  
  constructor(
    @InjectRepository(VeiculoEntity)
    private readonly veiculoRepository: Repository<VeiculoEntity>,
    @Inject(forwardRef(() => MarcaService)) private readonly marcaService: MarcaService
  ) {}

  public async criaVeiculo(dadosVeiculo: CriaVeiculoDTO) {

    const marca = await this.marcaService.buscaMarcaPorId(dadosVeiculo.marcaId);

    const veiculoEntity = new VeiculoEntity();
    veiculoEntity.modelo = dadosVeiculo.modelo;
    veiculoEntity.ano = dadosVeiculo.ano;
    veiculoEntity.valor = dadosVeiculo.valor;
    veiculoEntity.marca = marca;

    return this.veiculoRepository.save(veiculoEntity);
  }

  async obtemVeiculos() {
    const veiculosSalvos = await this.veiculoRepository.find({});

    const veiculosLista = veiculosSalvos.map(
      (veiculo) =>
        new VeiculoDTO(
          veiculo.id,
          veiculo.modelo,
          veiculo.ano,
          veiculo.valor,
          veiculo.marcaId
        ),
    );

    return veiculosLista;
  }

  async obtemVeiculo(id: string) {
    const veiculo = await this.veiculoRepository.findOne({
      where: { id },
      relations: {
      },
    });

    if (veiculo === null) {
      throw new NotFoundException('O veículo não foi encontrado');
    }

    const veiculoDTO = new VeiculoDTO(
      veiculo.id,
      veiculo.modelo,
      veiculo.ano,
      veiculo.valor,
      veiculo.marcaId
    );

    return veiculoDTO;
  }

  async obtemVeiculosPorMarca(marcaId: string) {
    await this.marcaService.buscaMarcaPorId(marcaId);

    const veiculos = await this.veiculoRepository.findBy({ marcaId });

    return veiculos;
  }

  async atualizaVeiculo(id: string, novosDados: AtualizaVeiculoDTO) {
    const veiculo = await this.buscaVeiculoPorId(id);

    veiculo.modelo = novosDados.modelo;
    veiculo.ano = novosDados.ano;
    veiculo.valor = novosDados.valor;
    veiculo.marcaId = novosDados.marcaId;

    return this.veiculoRepository.save(veiculo);
  }

  async excluiVeiculo(id: string) {
    await this.buscaVeiculoPorId(id);

    await this.veiculoRepository.delete(id);
  }

  public async buscaVeiculoPorId(id: string): Promise<VeiculoEntity> {
    const veiculo = await this.veiculoRepository.findOneBy({ id });

    if (veiculo === null) {
      throw new NotFoundException('O veiculo não foi encontrado');
    }

    return veiculo;
  }
}

