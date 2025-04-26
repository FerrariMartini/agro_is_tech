import { OmitType } from '@nestjs/swagger';
import { HarvestDto } from './harvest.dto';

export class HarvestResponseDto extends HarvestDto {}

export class CreateHarvestResponseDto extends OmitType(HarvestDto, [
  'updatedAt',
]) {}

export class UpdateHarvestResponseDto extends HarvestDto {}
