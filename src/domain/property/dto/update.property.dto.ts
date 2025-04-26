import { OmitType } from '@nestjs/swagger';
import { PropertyDto } from './property.dto';

export class UpdatePropertyDto extends OmitType(PropertyDto, [
  'createdAt',
  'updatedAt',
]) {}
