import { CreateCropDto } from './create.crop.dto';
import { UpdateCropDto } from './update.crop.dto';

export class CropResponseDto extends UpdateCropDto {
  createdAt: Date;
  updatedAt: Date;
}

export class CreateCropResponseDto extends CreateCropDto {
  id: string;
  createdAt: Date;
}

export class UpdateCropResponseDto extends UpdateCropDto {
  createdAt: Date;
  updatedAt: Date;
}
