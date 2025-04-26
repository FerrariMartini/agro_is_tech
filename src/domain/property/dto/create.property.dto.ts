import { OmitType } from '@nestjs/swagger';
import { PropertyDto } from './property.dto';

export class CreatePropertyDto extends OmitType(PropertyDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
