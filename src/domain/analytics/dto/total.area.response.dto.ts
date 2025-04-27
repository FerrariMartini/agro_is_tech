import { ApiProperty } from '@nestjs/swagger';

export class TotalAreaResponseDto {
  @ApiProperty({
    example: 12785.5,
    description: 'Sum of all property areas (in hectares).',
  })
  totalArea: number;
}
