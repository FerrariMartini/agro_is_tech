import { OmitType } from '@nestjs/swagger';
import { HarvestDto } from './harvest.dto';

export class UpdateHarvestDto extends OmitType(HarvestDto, [
  'createdAt',
  'updatedAt',
]) {}
