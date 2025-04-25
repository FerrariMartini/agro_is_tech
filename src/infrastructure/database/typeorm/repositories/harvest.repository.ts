import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmBaseRepository } from '../typeorm.base.repository';
import { HarvestOrmEntity } from '../entities/harvest.orm.entity';
import { Harvest } from '@/domain/haverst/entities/harvest.entity';
import { HarvestRepository } from '@/domain/haverst/repositories/harvest.repository.interface';

@Injectable()
export class TypeOrmHarvestRepository
  extends TypeOrmBaseRepository<HarvestOrmEntity, Harvest>
  implements HarvestRepository
{
  constructor(
    @InjectRepository(HarvestOrmEntity)
    repository: Repository<HarvestOrmEntity>,
  ) {
    super(repository);
  }

  toDomainEntity(orm: HarvestOrmEntity): Harvest {
    return new Harvest(
      orm.id,
      orm.year,
      orm.propertyId,
      orm.description,
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }

  toOrmPartial(domain: Harvest): Partial<HarvestOrmEntity> {
    return {
      id: domain.id,
      year: domain.year,
      propertyId: domain.propertyId,
      description: domain.description,
      updatedAt: domain.updatedAt,
    };
  }
}
