import { Injectable } from '@nestjs/common';

import { BaseCrudService } from '@/application/services/base.crud.service';
import { HarvestMapper } from '@/application/mappers/harvest.mapper';
import { Harvest } from '@/domain/haverst/entities/harvest.entity';
import {
  CreateHarvestResponseDto,
  HarvestResponseDto,
  UpdateHarvestResponseDto,
} from '@/domain/haverst/dto/harvest.response.dto';
import { HarvestUseCaseFactory } from '@/domain/haverst/usecase/harvest.usecase.factory';

@Injectable()
export class HarvestService extends BaseCrudService<
  Harvest,
  CreateHarvestResponseDto,
  UpdateHarvestResponseDto,
  HarvestResponseDto
> {
  constructor(
    factory: HarvestUseCaseFactory,
    private readonly mapper: HarvestMapper,
  ) {
    super(
      factory.create(),
      factory.update(),
      factory.findById(),
      factory.findAll(),
      factory.delete(),
    );
  }

  protected override mapCreate(h: Harvest): CreateHarvestResponseDto {
    return this.mapper.toCreateResponse(h);
  }

  protected override mapUpdate(h: Harvest): UpdateHarvestResponseDto {
    return this.mapper.toUpdateResponse(h);
  }

  protected override map(h: Harvest): HarvestResponseDto {
    return this.mapper.toResponse(h);
  }
}
