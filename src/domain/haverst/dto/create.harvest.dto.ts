import { IsUUID, IsInt, Min, Max, IsString, Length } from 'class-validator';

export class CreateHarvestDto {
  @IsInt()
  @Min(1900)
  @Max(2100)
  year: number;

  @IsString()
  @Length(2, 100)
  description: string;

  @IsUUID()
  propertyId: string;
}
