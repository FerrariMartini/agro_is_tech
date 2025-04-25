import { BaseRepository } from '../base.repository';

export class FindAllEntitiesUseCase<T> {
  constructor(private readonly repo: BaseRepository<T>) {}

  async execute(): Promise<T[]> {
    return this.repo.findAll();
  }
}
