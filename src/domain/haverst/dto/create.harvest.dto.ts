import { OmitType } from '@nestjs/swagger';
import { HarvestDto } from './harvest.dto';

export class CreateHarvestDto extends OmitType(HarvestDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
