import { Inject, Injectable } from '@nestjs/common';
import { Crop } from '../entities/crop.entity';
import { UpdateEntityUseCase } from '@/shared/usecase/update.entity.usecase';
import {
  CROP_REPOSITORY,
  CropRepository,
} from '../repository/crop.repository.interface';
import { UpdateCropDto } from '../dto/update.crop.dto';
import { CropNotFoundException } from '../exceptions/crop.exception';

@Injectable()
export class UpdateCropUseCase extends UpdateEntityUseCase<Crop> {
  constructor(
    @Inject(CROP_REPOSITORY)
    protected readonly repository: CropRepository,
  ) {
    super(repository);
  }

  async execute(dto: UpdateCropDto): Promise<Crop> {
    const found = await this.repository.findById(dto.id);
    if (!found) CropNotFoundException();

    const updated = new Crop(
      found.id,
      dto.description,
      dto.seed,
      dto.harvestId,
      found.createdAt,
      new Date(),
      null,
    );

    return this.repository.update(updated);
  }
}
