import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Property } from '../entities/property.entity';
import {
  PROPERTY_REPOSITORY,
  PropertyRepository,
} from '../repositories/property.repository.interface';
import { CreateEntityUseCase } from '@/shared/usecase/create.entity.usecase';
import { CreatePropertyDto } from '../dto/create.property.dto';
import { validateArea } from '../util/area.validation';

@Injectable()
export class CreatePropertyUseCase extends CreateEntityUseCase<Property> {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly repository: PropertyRepository,
  ) {
    super(repository);
  }

  async execute(dto: CreatePropertyDto): Promise<Property> {
    const {
      arableArea,
      city,
      name,
      producerId,
      state,
      totalArea,
      vegetationArea,
    } = dto;

    validateArea({ arableArea, totalArea, vegetationArea });

    const now = new Date();
    const property = new Property(
      uuidv4(),
      name,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      producerId,
      now,
      now,
      null,
    );

    return this.repository.create(property);
  }
}
