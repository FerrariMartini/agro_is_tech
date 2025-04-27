import { ApiProperty } from '@nestjs/swagger';

export class PropertiesByStateResponseDto {
  @ApiProperty({ example: 'SP', description: 'State abbreviation (UF).' })
  state: string;

  @ApiProperty({
    example: 10,
    description: 'Total number of properties in this state.',
  })
  total: number;
}
