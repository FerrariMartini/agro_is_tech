import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class PropertyDto {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'Unique identifier of the property',
    format: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'Farm São João',
    description: 'Name of the property',
    minLength: 5,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @ApiProperty({
    example: 'Ribeirão Preto',
    description: 'City where the property is located',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'SP',
    description: 'State where the property is located (abbreviation)',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    example: 150.5,
    description: 'Total area of the property in hectares',
    minimum: 0,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  totalArea: number;

  @ApiProperty({
    example: 100.0,
    description: 'Arable (plantable) area of the property in hectares',
    minimum: 0,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  arableArea: number;

  @ApiProperty({
    example: 50.5,
    description: 'Vegetation area of the property in hectares',
    minimum: 0,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  vegetationArea: number;

  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'UUID of the producer who owns the property',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  producerId: string;

  @ApiProperty({
    example: '2025-04-26T12:34:56.789Z',
    description: 'Timestamp when the property was created',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-04-27T15:45:12.123Z',
    description: 'Timestamp when the property was last updated',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;
}
