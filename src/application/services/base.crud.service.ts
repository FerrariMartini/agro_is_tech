export abstract class BaseCrudService<
  TDomain,
  TCreateResponse = TDomain,
  TUpdateResponse = TDomain,
  TResponse = TDomain,
  TCreateDto = any,
  TUpdateDto = any,
> {
  constructor(
    protected readonly createUseCase: {
      execute(dto: TCreateDto): Promise<TDomain>;
    },
    protected readonly updateUseCase: {
      execute(dto: TUpdateDto): Promise<TDomain>;
    },
    protected readonly findByIdUseCase: {
      execute(id: string): Promise<TDomain>;
    },
    protected readonly findAllUseCase: { execute(): Promise<TDomain[]> },
    protected readonly deleteUseCase: { execute(id: string): Promise<void> },
  ) {}

  async create(dto: TCreateDto): Promise<TCreateResponse> {
    const result = await this.createUseCase.execute(dto);
    return this.mapCreate(result);
  }

  async update(dto: TUpdateDto): Promise<TUpdateResponse> {
    const result = await this.updateUseCase.execute(dto);
    return this.mapUpdate(result);
  }

  async findById(id: string): Promise<TResponse> {
    const result = await this.findByIdUseCase.execute(id);
    return this.map(result);
  }

  async findAll(): Promise<TResponse[]> {
    const results = await this.findAllUseCase.execute();
    return results.map((r) => this.map(r));
  }

  async delete(id: string): Promise<void> {
    return this.deleteUseCase.execute(id);
  }

  protected abstract mapCreate(entity: TDomain): TCreateResponse;
  protected abstract mapUpdate(entity: TDomain): TUpdateResponse;
  protected abstract map(entity: TDomain): TResponse;
}
