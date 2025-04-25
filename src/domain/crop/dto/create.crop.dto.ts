import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateCropDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  seed: string;

  @IsUUID()
  @IsNotEmpty()
  harvestId: string;
}
