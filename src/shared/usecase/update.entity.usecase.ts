import { BaseRepository } from '../base.repository';

export abstract class UpdateEntityUseCase<T> {
  constructor(protected readonly repo: BaseRepository<T>) {}
  abstract execute(dto: T, id: string): Promise<T>;
}
