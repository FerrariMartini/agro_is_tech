import { BaseRepository } from '@/shared/base.repository';
import { Producer } from '../entities/producer.entity';

export const PRODUCER_REPOSITORY = Symbol('PRODUCER_REPOSITORY');

export interface ProducerRepository extends BaseRepository<Producer> {
  findByTaxIdHash(hash: string): Promise<Producer | null>;
}
