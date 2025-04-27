import { PropertyOrmEntity } from '@/infrastructure/database/typeorm/entities/property.orm.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GetAreaUsageUseCase {
  constructor(
    @InjectRepository(PropertyOrmEntity)
    private readonly propertyRepository: Repository<PropertyOrmEntity>,
  ) {}

  async execute(): Promise<{ arableArea: number; vegetationArea: number }> {
    const result = await this.propertyRepository
      .createQueryBuilder('property')
      .select('SUM(property.arableArea)', 'arableArea')
      .addSelect('SUM(property.vegetationArea)', 'vegetationArea')
      .where('property.deletedAt IS NULL')
      .getRawOne<{ arableArea: string; vegetationArea: string }>();

    return {
      arableArea: Number(result?.arableArea || 0),
      vegetationArea: Number(result?.vegetationArea || 0),
    };
  }
}
