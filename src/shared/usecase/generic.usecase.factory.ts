import { BaseRepository } from '../base.repository';
import { CreateEntityUseCase } from './create.entity.usecase';
import { DeleteEntityUseCase } from './delete.entity.usecase';
import { FindAllEntitiesUseCase } from './find.all.entity.usecase';
import { FindEntityByIdUseCase } from './find.entity.byid.usecase';
import { UpdateEntityUseCase } from './update.entity.usecase';

export abstract class GenericUseCaseFactory<T> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  abstract create(): CreateEntityUseCase<T>;
  abstract update(): UpdateEntityUseCase<T>;

  findById(): FindEntityByIdUseCase<T> {
    return new FindEntityByIdUseCase<T>(this.repository);
  }

  findAll(): FindAllEntitiesUseCase<T> {
    return new FindAllEntitiesUseCase<T>(this.repository);
  }

  delete(): DeleteEntityUseCase<T> {
    return new DeleteEntityUseCase(this.repository);
  }
}
