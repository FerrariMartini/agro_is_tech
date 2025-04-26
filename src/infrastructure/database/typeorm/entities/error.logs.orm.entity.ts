import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('error_logs')
export class ErrorLogOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  path: string;

  @Column({ type: 'varchar', length: 10 })
  method: string;

  @Column({ type: 'int' })
  statusCode: number;

  @Column({ type: 'varchar', length: 255 })
  error: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text', nullable: true })
  stack?: string;

  @Column({ type: 'jsonb', nullable: true })
  payload?: any;

  @Column({ type: 'jsonb', nullable: true })
  headers?: any;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
