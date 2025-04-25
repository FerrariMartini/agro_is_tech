import { Injectable } from '@nestjs/common';
import { Crop } from '@/domain/crop/entities/crop.entity';
import { BaseCrudService } from '../base.crud.service';
import {
  CreateCropResponseDto,
  CropResponseDto,
  UpdateCropResponseDto,
} from '@/domain/crop/dto/crop.response.dto';
import { CropUseCaseFactory } from '@/domain/crop/usercase/crop.usecase.factory';
import { CropMapper } from '@/application/mappers/crop.mapper';

@Injectable()
export class CropService extends BaseCrudService<
  Crop,
  CreateCropResponseDto,
  UpdateCropResponseDto,
  CropResponseDto
> {
  constructor(
    factory: CropUseCaseFactory,
    private readonly mapper: CropMapper,
  ) {
    super(
      factory.create(),
      factory.update(),
      factory.findById(),
      factory.findAll(),
      factory.delete(),
    );
  }

  protected override mapCreate(c: Crop): CreateCropResponseDto {
    return this.mapper.toCreateResponse(c);
  }

  protected override mapUpdate(c: Crop): UpdateCropResponseDto {
    return this.mapper.toUpdateResponse(c);
  }

  protected override map(c: Crop): CropResponseDto {
    return this.mapper.toResponse(c);
  }
}
