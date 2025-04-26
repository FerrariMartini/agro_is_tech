import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CropDto {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'Unique identifier of the producer',
    format: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'Soybean crop for summer',
    description: 'Description of the crop',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Soybean',
    description: 'Seed type used for the crop',
  })
  @IsString()
  @IsNotEmpty()
  seed: string;

  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'UUID of the harvest associated with this crop',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  harvestId: string;

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
