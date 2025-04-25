import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmBaseRepository } from '../typeorm.base.repository';
import { PropertyOrmEntity } from '../entities/property.orm.entity';
import { Property } from '@/domain/property/entities/property.entity';
import { PropertyRepository } from '@/domain/property/repositories/property.repository.interface';

@Injectable()
export class TypeOrmPropertyRepository
  extends TypeOrmBaseRepository<PropertyOrmEntity, Property>
  implements PropertyRepository
{
  constructor(
    @InjectRepository(PropertyOrmEntity)
    repository: Repository<PropertyOrmEntity>,
  ) {
    super(repository);
  }

  toDomainEntity(orm: PropertyOrmEntity): Property {
    return new Property(
      orm.id,
      orm.name,
      orm.city,
      orm.state,
      orm.totalArea,
      orm.arableArea,
      orm.vegetationArea,
      orm.producerId,
      orm.createdAt,
      orm.updatedAt,
    );
  }

  toOrmPartial(domain: Property): Partial<PropertyOrmEntity> {
    return {
      id: domain.id,
      name: domain.name,
      city: domain.city,
      state: domain.state,
      totalArea: domain.totalArea,
      arableArea: domain.arableArea,
      vegetationArea: domain.vegetationArea,
      producerId: domain.producerId,
      updatedAt: domain.updatedAt,
    };
  }
}
