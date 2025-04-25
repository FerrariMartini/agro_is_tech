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
import { HarvestOrmEntity } from './harvest.orm.entity';

@Entity({ name: 'crops' })
export class CropOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  seed: string;

  @Column()
  harvestId: string;

  @ManyToOne(() => HarvestOrmEntity)
  @JoinColumn({ name: 'harvest_id' })
  harvest: HarvestOrmEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
