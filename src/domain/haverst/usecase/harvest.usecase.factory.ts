import { Inject, Injectable } from '@nestjs/common';
import {
  HARVEST_REPOSITORY,
  HarvestRepository,
} from '../repositories/harvest.repository.interface';
import { Harvest } from '../entities/harvest.entity';
import { CreateHarvestUseCase } from '../usecase/create.harvest.usecase';
import { UpdateHarvestUseCase } from '../usecase/update.harvest.usecase';
import { GenericUseCaseFactory } from '@/shared/usecase/generic.usecase.factory';

@Injectable()
export class HarvestUseCaseFactory extends GenericUseCaseFactory<Harvest> {
  constructor(
    @Inject(HARVEST_REPOSITORY)
    protected readonly repository: HarvestRepository,
  ) {
    super(repository);
  }

  create(): CreateHarvestUseCase {
    return new CreateHarvestUseCase(this.repository);
  }

  update(): UpdateHarvestUseCase {
    return new UpdateHarvestUseCase(this.repository);
  }
}
