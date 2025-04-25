import {
  CreateHarvestResponseDto,
  HarvestResponseDto,
  UpdateHarvestResponseDto,
} from '@/domain/haverst/dto/harvest.response.dto';
import { Harvest } from '@/domain/haverst/entities/harvest.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HarvestMapper {
  toCreateResponse(harvest: Harvest): CreateHarvestResponseDto {
    return {
      id: harvest.id,
      year: harvest.year,
      propertyId: harvest.propertyId,
      description: harvest.description,
      createdAt: harvest.createdAt,
    };
  }

  toUpdateResponse(harvest: Harvest): UpdateHarvestResponseDto {
    return {
      ...this.toCreateResponse(harvest),
      updatedAt: harvest.updatedAt,
    };
  }

  toResponse(harvest: Harvest): HarvestResponseDto {
    return {
      ...this.toUpdateResponse(harvest),
    };
  }

  toResponseList(harvests: Harvest[]): HarvestResponseDto[] {
    return harvests.map((h) => this.toResponse(h));
  }
}
