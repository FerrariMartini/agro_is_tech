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
import { PropertyOrmEntity } from './property.orm.entity';

@Entity({ name: 'harvests' })
export class HarvestOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  year: number;

  @Column()
  propertyId: string;

  @ManyToOne(() => PropertyOrmEntity)
  @JoinColumn({ name: 'property_id' })
  property: PropertyOrmEntity;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
