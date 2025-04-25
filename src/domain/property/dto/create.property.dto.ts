import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUUID,
  Min,
  Length,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @Min(0)
  totalArea: number;

  @IsNumber()
  @Min(0)
  arableArea: number;

  @IsNumber()
  @Min(0)
  vegetationArea: number;

  @IsUUID()
  @IsNotEmpty()
  producerId: string;
}
