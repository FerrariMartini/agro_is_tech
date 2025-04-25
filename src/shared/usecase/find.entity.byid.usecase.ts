import { BaseRepository } from '../base.repository';
import { GenericNotFoundException } from '../errors/exception/app.exception';

export class FindEntityByIdUseCase<T> {
  constructor(private readonly repo: BaseRepository<T>) {}

  async execute(id: string): Promise<T> {
    const entity = await this.repo.findById(id);
    if (!entity) GenericNotFoundException();
    return entity;
  }
}
