import { HarvestController } from '@/application/controllers/harvest/harvest.controller';
import { HarvestMapper } from '@/application/mappers/harvest.mapper';
import { HarvestService } from '@/application/services/harvest/harvest.service';
import { HARVEST_REPOSITORY } from '@/domain/haverst/repositories/harvest.repository.interface';
import { HarvestUseCaseFactory } from '@/domain/haverst/usecase/harvest.usecase.factory';
import { HarvestOrmEntity } from '@/infrastructure/database/typeorm/entities/harvest.orm.entity';
import { TypeOrmHarvestRepository } from '@/infrastructure/database/typeorm/repositories/harvest.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HarvestOrmEntity])],
  controllers: [HarvestController],
  exports: [HarvestService],
  providers: [
    {
      provide: HARVEST_REPOSITORY,
      useClass: TypeOrmHarvestRepository,
    },
    HarvestUseCaseFactory,
    HarvestMapper,
    HarvestService,
  ],
})
export class HarvestModule {}
