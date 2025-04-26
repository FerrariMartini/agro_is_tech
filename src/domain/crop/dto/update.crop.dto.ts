import { OmitType } from '@nestjs/swagger';
import { CropDto } from './crop.dto';

export class UpdateCropDto extends OmitType(CropDto, [
  'createdAt',
  'updatedAt',
]) {}
