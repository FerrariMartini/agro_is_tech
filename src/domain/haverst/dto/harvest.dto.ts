import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsString, Length, IsUUID } from 'class-validator';

export class HarvestDto {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'Unique identifier of the producer',
    format: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 2025,
    description: 'Harvest year (must be between 1900 and 2100)',
    minimum: 1900,
    maximum: 2100,
  })
  @IsInt()
  @Min(1900)
  @Max(2100)
  year: number;

  @ApiProperty({
    example: 'Summer harvest',
    description: 'Description of the harvest',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @Length(2, 100)
  description: string;

  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'UUID of the property associated with the harvest',
    format: 'uuid',
  })
  @IsUUID()
  propertyId: string;

  @ApiProperty({
    example: '2025-04-26T12:34:56.789Z',
    description: 'Timestamp when the harvest record was created',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-04-27T15:45:12.123Z',
    description: 'Timestamp when the harvest record was last updated',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;
}
