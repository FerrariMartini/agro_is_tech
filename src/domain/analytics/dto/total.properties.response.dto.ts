import { ApiProperty } from '@nestjs/swagger';

export class TotalPropertiesResponseDto {
  @ApiProperty({
    example: 23,
    description: 'Total number of registered properties.',
  })
  totalProperties: number;
}
