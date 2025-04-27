import { PropertyOrmEntity } from '@/infrastructure/database/typeorm/entities/property.orm.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GetPropertiesByStateUseCase {
  constructor(
    @InjectRepository(PropertyOrmEntity)
    private readonly propertyRepository: Repository<PropertyOrmEntity>,
  ) {}

  async execute(): Promise<{ state: string; total: number }[]> {
    const result = await this.propertyRepository
      .createQueryBuilder('property')
      .select('property.state', 'state')
      .addSelect('COUNT(property.id)', 'total')
      .where('property.deletedAt IS NULL')
      .groupBy('property.state')
      .getRawMany<{ state: string; total: string }>();

    return result.map((r) => ({
      state: r.state,
      total: Number(r.total),
    }));
  }
}
