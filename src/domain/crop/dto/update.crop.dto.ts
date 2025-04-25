import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class UpdateCropDto {
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  seed: string;

  @IsUUID()
  harvestId: string;
}
