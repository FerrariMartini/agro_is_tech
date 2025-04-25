import { BaseRepository } from '../base.repository';

export class DeleteEntityUseCase<T> {
  constructor(private readonly repo: BaseRepository<T>) {}

  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
