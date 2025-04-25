import { Inject, Injectable } from '@nestjs/common';
import {
  PROPERTY_REPOSITORY,
  PropertyRepository,
} from '../repositories/property.repository.interface';
import { Property } from '../entities/property.entity';
import { UpdateEntityUseCase } from '@/shared/usecase/update.entity.usecase';
import { UpdatePropertyDto } from '../dto/update.property.dto';
import { PropertyNotFoundException } from '../exceptions/property.exception';
import { validateArea } from '../util/area.validation';

@Injectable()
export class UpdatePropertyUseCase extends UpdateEntityUseCase<Property> {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly repository: PropertyRepository,
  ) {
    super(repository);
  }

  async execute(dto: UpdatePropertyDto): Promise<Property> {
    const found = await this.repository.findById(dto.id);
    if (!found) PropertyNotFoundException();

    const {
      arableArea,
      city,
      name,
      producerId,
      state,
      totalArea,
      vegetationArea,
    } = dto;

    validateArea({ vegetationArea, arableArea, totalArea });

    const updated = new Property(
      found.id,
      name,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      producerId,
      found.createdAt,
      new Date(),
      null,
    );

    return this.repository.update(updated);
  }
}
