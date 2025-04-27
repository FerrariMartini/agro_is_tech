import { ApiProperty } from '@nestjs/swagger';

export class AreaUsageResponseDto {
  @ApiProperty({
    example: 8500,
    description: 'Total arable area (in hectares).',
  })
  arableArea: number;

  @ApiProperty({
    example: 4285.5,
    description: 'Total vegetation area (in hectares).',
  })
  vegetationArea: number;
}
