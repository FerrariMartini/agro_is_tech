import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  HARVEST_REPOSITORY,
  HarvestRepository,
} from '../repositories/harvest.repository.interface';
import { Harvest } from '../entities/harvest.entity';
import { CreateEntityUseCase } from '@/shared/usecase/create.entity.usecase';
import { CreateHarvestDto } from '../dto/create.harvest.dto';

@Injectable()
export class CreateHarvestUseCase extends CreateEntityUseCase<Harvest> {
  constructor(
    @Inject(HARVEST_REPOSITORY)
    protected readonly repository: HarvestRepository,
  ) {
    super(repository);
  }

  async execute(dto: CreateHarvestDto): Promise<Harvest> {
    const now = new Date();
    const harvest = new Harvest(
      uuidv4(),
      dto.year,
      dto.propertyId,
      dto.description,
      now,
      now,
      null,
    );

    return this.repository.create(harvest);
  }
}
