import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmBaseRepository } from '../typeorm.base.repository';
import { CropOrmEntity } from '../entities/crop.orm.entity';
import { Crop } from '@/domain/crop/entities/crop.entity';
import { CropRepository } from '@/domain/crop/repository/crop.repository.interface';

@Injectable()
export class TypeOrmCropRepository
  extends TypeOrmBaseRepository<CropOrmEntity, Crop>
  implements CropRepository
{
  constructor(
    @InjectRepository(CropOrmEntity)
    repository: Repository<CropOrmEntity>,
  ) {
    super(repository);
  }

  toDomainEntity(orm: CropOrmEntity): Crop {
    return new Crop(
      orm.id,
      orm.description,
      orm.seed,
      orm.harvestId,
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }

  toOrmPartial(domain: Crop): Partial<CropOrmEntity> {
    return {
      id: domain.id,
      description: domain.description,
      seed: domain.seed,
      harvestId: domain.harvestId,
      updatedAt: domain.updatedAt,
    };
  }
}
