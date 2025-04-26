import { OmitType } from '@nestjs/swagger';
import { PropertyDto } from './property.dto';

export class PropertyResponseDto extends PropertyDto {}

export class CreatePropertyResponseDto extends OmitType(PropertyDto, [
  'updatedAt',
]) {}

export class UpdatePropertyResponseDto extends PropertyDto {}
