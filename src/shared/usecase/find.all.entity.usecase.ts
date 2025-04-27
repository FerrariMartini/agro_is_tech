import { BaseRepository } from '../base.repository';
import { RequestPaginateQueryDto } from '../dto/paginate.query.request';
import { PaginatedResponseDto } from '../dto/paginated.response.dto';

export class FindAllEntitiesUseCase<T> {
  constructor(private readonly repo: BaseRepository<T>) {}

  async execute(
    params: RequestPaginateQueryDto,
  ): Promise<PaginatedResponseDto<T>> {
    const { page, limit, orderBy } = params;
    const { data, total } = await this.repo.findAll(params);
    return {
      data,
      total,
      page,
      limit,
      orderBy,
    };
  }
}
