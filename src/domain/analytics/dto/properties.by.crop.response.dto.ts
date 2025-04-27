import { ApiProperty } from '@nestjs/swagger';

export class PropertiesByCropResponseDto {
  @ApiProperty({ example: 'Soy', description: 'Crop seed name.' })
  seed: string;

  @ApiProperty({
    example: 12,
    description: 'Total number of properties growing this crop.',
  })
  total: number;
}
