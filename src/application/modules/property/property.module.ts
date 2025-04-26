import { PropertyController } from '@/application/controllers/property/property.controller';
import { PropertyMapper } from '@/application/mappers/property.mapper';
import { PropertyService } from '@/application/services/property/property.service';
import { PROPERTY_REPOSITORY } from '@/domain/property/repositories/property.repository.interface';
import { PropertyUseCaseFactory } from '@/domain/property/usecase/property.usecase.factory';
import { PropertyOrmEntity } from '@/infrastructure/database/typeorm/entities/property.orm.entity';
import { TypeOrmPropertyRepository } from '@/infrastructure/database/typeorm/repositories/property.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyOrmEntity])],
  controllers: [PropertyController],
  exports: [PropertyService],
  providers: [
    {
      provide: PROPERTY_REPOSITORY,
      useClass: TypeOrmPropertyRepository,
    },
    PropertyUseCaseFactory,
    PropertyMapper,
    PropertyService,
  ],
})
export class PropertyModule {}
