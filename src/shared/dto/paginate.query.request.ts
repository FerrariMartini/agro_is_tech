import { OmitType } from '@nestjs/swagger';
import { PaginateQueryDto } from './paginate.query';

export class RequestPaginateQueryDto extends OmitType(PaginateQueryDto, [
  'data',
  'total',
]) {}
