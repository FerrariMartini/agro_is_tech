import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class PaginateQueryDto<T = unknown> {
  @ApiProperty({
    example: 1,
    description: 'Current page number',
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  limit: number;

  @ApiProperty({
    example: 'DESC',
    description: 'Set order of list DESC = Descending and ASC = Ascending',
  })
  @IsOptional()
  orderBy: 'DESC' | 'ASC';

  @ApiProperty({
    description: 'List of items on the current page',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    example: 100,
    description: 'Total number of items found',
  })
  total: number;
}
