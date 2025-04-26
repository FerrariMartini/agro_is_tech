import { OmitType } from '@nestjs/swagger';
import { CropDto } from './crop.dto';

export class CropResponseDto extends CropDto {}

export class CreateCropResponseDto extends OmitType(CropDto, ['updatedAt']) {}

export class UpdateCropResponseDto extends CropDto {}
