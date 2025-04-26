import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropOrmEntity } from '@/infrastructure/database/typeorm/entities/crop.orm.entity';
import { TypeOrmCropRepository } from '@/infrastructure/database/typeorm/repositories/crop.repository';
import { CropController } from '@/application/controllers/crop/crop.controller';
import { CROP_REPOSITORY } from '@/domain/crop/repository/crop.repository.interface';
import { CropUseCaseFactory } from '@/domain/crop/usercase/crop.usecase.factory';
import { CropMapper } from '@/application/mappers/crop.mapper';
import { CropService } from '@/application/services/crop/crop.service';

@Module({
  imports: [TypeOrmModule.forFeature([CropOrmEntity])],
  controllers: [CropController],
  exports: [CropService],
  providers: [
    {
      provide: CROP_REPOSITORY,
      useClass: TypeOrmCropRepository,
    },
    CropUseCaseFactory,
    CropMapper,
    CropService,
  ],
})
export class CropModule {}
