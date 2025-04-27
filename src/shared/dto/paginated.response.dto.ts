import { PaginateQueryDto } from './paginate.query';

export class PaginatedResponseDto<T = unknown> extends PaginateQueryDto<T> {}
