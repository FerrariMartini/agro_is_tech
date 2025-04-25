import { Inject, Injectable } from '@nestjs/common';
import {
  HARVEST_REPOSITORY,
  HarvestRepository,
} from '../repositories/harvest.repository.interface';
import { Harvest } from '../entities/harvest.entity';
import { UpdateEntityUseCase } from '@/shared/usecase/update.entity.usecase';
import { UpdateHarvestDto } from '../dto/update.harvest.dto';
import { HarvestNotFoundException } from '../exceptions/harvest.exception';

@Injectable()
export class UpdateHarvestUseCase extends UpdateEntityUseCase<Harvest> {
  constructor(
    @Inject(HARVEST_REPOSITORY)
    protected readonly repository: HarvestRepository,
  ) {
    super(repository);
  }

  async execute(dto: UpdateHarvestDto): Promise<Harvest> {
    const found = await this.repository.findById(dto.id);
    if (!found) HarvestNotFoundException();

    const updated = new Harvest(
      found.id,
      dto.year,
      dto.propertyId,
      dto.description,
      found.createdAt,
      new Date(),
      null,
    );

    return this.repository.update(updated);
  }
}
