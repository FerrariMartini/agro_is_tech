import { Inject, Injectable } from '@nestjs/common';
import {
  PROPERTY_REPOSITORY,
  PropertyRepository,
} from '../repositories/property.repository.interface';
import { CreatePropertyUseCase } from '../usecase/create.property.usecase';
import { UpdatePropertyUseCase } from '../usecase/update.property.usecase';
import { Property } from '../entities/property.entity';
import { GenericUseCaseFactory } from '@/shared/usecase/generic.usecase.factory';

@Injectable()
export class PropertyUseCaseFactory extends GenericUseCaseFactory<Property> {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    protected readonly repository: PropertyRepository,
  ) {
    super(repository);
  }

  create(): CreatePropertyUseCase {
    return new CreatePropertyUseCase(this.repository);
  }

  update(): UpdatePropertyUseCase {
    return new UpdatePropertyUseCase(this.repository);
  }
}
