import { PropertyOrmEntity } from '@/infrastructure/database/typeorm/entities/property.orm.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './controllers/analytics.controller';
import { AnalyticsService } from './services/analytics.service';
import { GetTotalPropertiesUseCase } from './usecases/get.total.properties.usecase';
import { GetTotalAreaUseCase } from './usecases/get.total.area.usecase';
import { CropOrmEntity } from '@/infrastructure/database/typeorm/entities/crop.orm.entity';
import { GetPropertiesByStateUseCase } from './usecases/get.properties.by.state.usecase';
import { GetPropertiesByCropUseCase } from './usecases/get.properties.by.crop.usecase';
import { GetAreaUsageUseCase } from './usecases/get.area.usage.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyOrmEntity, CropOrmEntity])],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    GetTotalPropertiesUseCase,
    GetTotalAreaUseCase,
    GetPropertiesByStateUseCase,
    GetPropertiesByCropUseCase,
    GetAreaUsageUseCase,
  ],
})
export class AnalyticsModule {}
