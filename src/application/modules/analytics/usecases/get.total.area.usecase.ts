import { PropertyOrmEntity } from '@/infrastructure/database/typeorm/entities/property.orm.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GetTotalAreaUseCase {
  constructor(
    @InjectRepository(PropertyOrmEntity)
    private readonly propertyRepository: Repository<PropertyOrmEntity>,
  ) {}

  async execute(): Promise<number> {
    const result = await this.propertyRepository
      .createQueryBuilder('property')
      .select('SUM(property.totalArea)', 'sum')
      .where('property.deletedAt IS NULL')
      .getRawOne<{ sum: string }>();

    return Number(result?.sum || 0);
  }
}
