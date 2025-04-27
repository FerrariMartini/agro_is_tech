import { PropertyOrmEntity } from '@/infrastructure/database/typeorm/entities/property.orm.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class GetTotalPropertiesUseCase {
  constructor(
    @InjectRepository(PropertyOrmEntity)
    private readonly propertyRepository: Repository<PropertyOrmEntity>,
  ) {}

  async execute(): Promise<number> {
    const total = await this.propertyRepository.count({
      where: { deletedAt: IsNull() },
    });
    return total;
  }
}
