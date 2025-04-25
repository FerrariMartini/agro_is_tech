import { Injectable } from '@nestjs/common';
import { Property } from '@/domain/property/entities/property.entity';

import { BaseCrudService } from '@/application/services/base.crud.service';
import { PropertyMapper } from '@/application/mappers/property.mapper';
import {
  CreatePropertyResponseDto,
  PropertyResponseDto,
  UpdatePropertyResponseDto,
} from '@/domain/property/dto/property.response.dto';
import { PropertyUseCaseFactory } from '@/domain/property/usecase/property.usecase.factory';

@Injectable()
export class PropertyService extends BaseCrudService<
  Property,
  CreatePropertyResponseDto,
  UpdatePropertyResponseDto,
  PropertyResponseDto
> {
  constructor(
    factory: PropertyUseCaseFactory,
    private readonly mapper: PropertyMapper,
  ) {
    super(
      factory.create(),
      factory.update(),
      factory.findById(),
      factory.findAll(),
      factory.delete(),
    );
  }

  protected override mapCreate(entity: Property): CreatePropertyResponseDto {
    return this.mapper.toCreateResponse(entity);
  }

  protected override mapUpdate(entity: Property): UpdatePropertyResponseDto {
    return this.mapper.toUpdateResponse(entity);
  }

  protected override map(entity: Property): PropertyResponseDto {
    return this.mapper.toResponse(entity);
  }
}
