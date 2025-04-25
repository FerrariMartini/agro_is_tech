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

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
