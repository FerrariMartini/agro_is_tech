import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Crop } from '../entities/crop.entity';
import { CreateEntityUseCase } from '@/shared/usecase/create.entity.usecase';
import {
  CROP_REPOSITORY,
  CropRepository,
} from '../repository/crop.repository.interface';
import { CreateCropDto } from '../dto/create.crop.dto';

@Injectable()
export class CreateCropUseCase extends CreateEntityUseCase<Crop> {
  constructor(
    @Inject(CROP_REPOSITORY)
    protected readonly repository: CropRepository,
  ) {
    super(repository);
  }

  async execute(dto: CreateCropDto): Promise<Crop> {
    const now = new Date();
    const crop = new Crop(
      uuidv4(),
      dto.description,
      dto.seed,
      dto.harvestId,
      now,
      now,
      null,
    );

    return this.repository.create(crop);
  }
}
