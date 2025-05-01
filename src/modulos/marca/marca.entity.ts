import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { VeiculoEntity } from '../veiculo/veiculo.entity';

@Entity({ name: 'marcas' })
export class MarcaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @OneToMany(() => VeiculoEntity, (veiculo) => veiculo.marca, {
    cascade: false
  })
  veiculos: VeiculoEntity[]
}
