import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ProducerModule } from './producer/producer.module';
import { typeOrmConfig } from '../../config/typeorm.config';
import { PropertyModule } from './property/property.module';
import { HarvestModule } from './harvest/harvest.module';
import { CropModule } from './crop/crop.module';
import { SeedService } from '@/infrastructure/database/seed/seed.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@/shared/errors/all.exception.filter';
import { ErrorLogOrmEntity } from '@/infrastructure/database/typeorm/entities/error.logs.orm.entity';
import { ThrottlerModule } from '@nestjs/throttler';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ErrorLogOrmEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    ProducerModule,
    PropertyModule,
    HarvestModule,
    CropModule,
    AnalyticsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeedService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
