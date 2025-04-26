import { CropDto } from './crop.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateCropDto extends OmitType(CropDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
