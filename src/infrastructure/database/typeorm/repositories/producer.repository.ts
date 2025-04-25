import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerOrmEntity } from '../entities/producer.orm.entity';
import { ProducerRepository } from '@/domain/producer/repositories/producer.repository.interface';
import { Producer } from '@/domain/producer/entities/producer.entity';
import { TypeOrmBaseRepository } from '../typeorm.base.repository';

@Injectable()
export class TypeOrmProducerRepository
  extends TypeOrmBaseRepository<ProducerOrmEntity, Producer>
  implements ProducerRepository
{
  constructor(
    @InjectRepository(ProducerOrmEntity)
    repository: Repository<ProducerOrmEntity>,
  ) {
    super(repository);
  }

  toDomainEntity(orm: ProducerOrmEntity): Producer {
    return new Producer(
      orm.id,
      orm.taxId,
      orm.taxIdHash,
      orm.name,
      orm.email,
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }

  toOrmPartial(domain: Producer): Partial<ProducerOrmEntity> {
    return {
      id: domain.id,
      taxId: domain.taxId,
      taxIdHash: domain.taxIdHash,
      name: domain.name,
      email: domain.email,
      updatedAt: domain.updatedAt,
    };
  }

  async findByTaxIdHash(taxIdHash: string): Promise<Producer | null> {
    const found = await this.repo.findOneBy({ taxIdHash });
    return found ? this.toDomainEntity(found) : null;
  }
}
