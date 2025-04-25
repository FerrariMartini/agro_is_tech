export interface BaseRepository<T> {
  create(entities: T): Promise<T>;
  update(entities: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<T[]>;
}
