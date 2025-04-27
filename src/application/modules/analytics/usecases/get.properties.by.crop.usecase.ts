import { CropOrmEntity } from '@/infrastructure/database/typeorm/entities/crop.orm.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GetPropertiesByCropUseCase {
  constructor(
    @InjectRepository(CropOrmEntity)
    private readonly cropRepository: Repository<CropOrmEntity>,
  ) {}

  async execute(): Promise<{ seed: string; total: number }[]> {
    const result = await this.cropRepository
      .createQueryBuilder('crop')
      .select('crop.seed', 'seed')
      .addSelect('COUNT(crop.id)', 'total')
      .where('crop.deletedAt IS NULL')
      .groupBy('crop.seed')
      .getRawMany<{ seed: string; total: string }>();

    return result.map((r) => ({
      seed: r.seed,
      total: Number(r.total),
    }));
  }
}
