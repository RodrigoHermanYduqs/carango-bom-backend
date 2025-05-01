import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  JoinColumn
} from 'typeorm';
import { MarcaEntity } from '../marca/marca.entity';

@Entity({ name: 'veiculos' })
export class VeiculoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'modelo', length: 50, nullable: false })
  modelo: string;

  @Column({ name: 'ano', nullable: false })
  ano: number;

  @Column({ name: 'valor', nullable: false })
  valor: number;
  
  @Column({ name: 'marca_id', nullable: false })
  marcaId: string;

  @ManyToOne(() => MarcaEntity, (marca) => marca.id, { cascade: false })
  @JoinColumn({ name: 'marca_id' })
  marca: MarcaEntity
}