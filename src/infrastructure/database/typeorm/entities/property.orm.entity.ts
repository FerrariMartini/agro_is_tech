import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProducerOrmEntity } from './producer.orm.entity';

@Entity({ name: 'properties' })
export class PropertyOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  totalArea: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  arableArea: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  vegetationArea: number;

  @Column()
  producerId: string;

  @ManyToOne(() => ProducerOrmEntity)
  @JoinColumn({ name: 'producer_id' })
  producer: ProducerOrmEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
