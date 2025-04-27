import { RequestPaginateQueryDto } from './dto/paginate.query.request';

export interface BaseRepository<T> {
  create(entities: T): Promise<T>;
  update(entities: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  delete(id: string): Promise<void>;
  findAll(
    params: RequestPaginateQueryDto,
  ): Promise<{ data: T[]; total: number }>;
}
