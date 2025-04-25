import { CreateHarvestDto } from './create.harvest.dto';
import { UpdateHarvestDto } from './update.harvest.dto';

export class HarvestResponseDto extends UpdateHarvestDto {
  createdAt: Date;
  updatedAt: Date;
}

export class CreateHarvestResponseDto extends CreateHarvestDto {
  id: string;
  createdAt: Date;
}

export class UpdateHarvestResponseDto extends UpdateHarvestDto {
  createdAt: Date;
  updatedAt: Date;
}
