import { BaseRepository } from '../base.repository';

export abstract class CreateEntityUseCase<T> {
  constructor(protected readonly repo: BaseRepository<T>) {}
  abstract execute(dto: T): Promise<T>;
}
