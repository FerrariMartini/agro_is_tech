import {
  CreateCropResponseDto,
  CropResponseDto,
  UpdateCropResponseDto,
} from '@/domain/crop/dto/crop.response.dto';
import { Crop } from '@/domain/crop/entities/crop.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CropMapper {
  toCreateResponse(crop: Crop): CreateCropResponseDto {
    return {
      id: crop.id,
      description: crop.description,
      seed: crop.seed,
      harvestId: crop.harvestId,
      createdAt: crop.createdAt,
    };
  }

  toUpdateResponse(crop: Crop): UpdateCropResponseDto {
    return {
      ...this.toCreateResponse(crop),
      updatedAt: crop.updatedAt,
    };
  }

  toResponse(crop: Crop): CropResponseDto {
    return {
      ...this.toUpdateResponse(crop),
    };
  }

  toResponseList(crops: Crop[]): CropResponseDto[] {
    return crops.map((c) => this.toResponse(c));
  }
}
