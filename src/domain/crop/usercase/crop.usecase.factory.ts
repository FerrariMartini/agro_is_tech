import { Inject, Injectable } from '@nestjs/common';
import { Crop } from '../entities/crop.entity';
import { GenericUseCaseFactory } from '@/shared/usecase/generic.usecase.factory';
import {
  CROP_REPOSITORY,
  CropRepository,
} from '../repository/crop.repository.interface';
import { CreateCropUseCase } from './create.crop.usecase';
import { UpdateCropUseCase } from './update.crop.usecase';

@Injectable()
export class CropUseCaseFactory extends GenericUseCaseFactory<Crop> {
  constructor(
    @Inject(CROP_REPOSITORY)
    protected readonly repository: CropRepository,
  ) {
    super(repository);
  }

  create(): CreateCropUseCase {
    return new CreateCropUseCase(this.repository);
  }

  update(): UpdateCropUseCase {
    return new UpdateCropUseCase(this.repository);
  }
}
