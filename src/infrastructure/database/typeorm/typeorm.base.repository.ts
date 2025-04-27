import { RequestPaginateQueryDto } from '@/shared/dto/paginate.query.request';
import { IsNull, ObjectLiteral, Repository } from 'typeorm';

export abstract class TypeOrmBaseRepository<
  TOrm extends ObjectLiteral,
  TDomain,
> {
  constructor(protected readonly repo: Repository<TOrm>) {}

  abstract toDomainEntity(entity: TOrm): TDomain;
  abstract toOrmPartial(domain: TDomain): Partial<TOrm>;

  async findById(id: string): Promise<TDomain | null> {
    const found = await this.repo.findOneBy({ id } as any);
    return found ? this.toDomainEntity(found) : null;
  }

  async findAll(
    queryParams: RequestPaginateQueryDto,
  ): Promise<{ data: TDomain[]; total: number }> {
    const { page = 1, limit = 10, orderBy } = queryParams;

    const [all, total] = await this.repo.findAndCount({
      where: { deletedAt: IsNull() as any },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: orderBy as any },
    });

    return {
      data: all.map((e) => this.toDomainEntity(e)),
      total,
    };
  }

  async create(domain: TDomain): Promise<TDomain> {
    const orm = this.repo.create(domain as any);
    const saved = await this.repo.save(orm);
    return this.toDomainEntity(saved as unknown as TOrm);
  }

  async update(domain: TDomain): Promise<TDomain> {
    const updatePayload = this.toOrmPartial(domain);
    await this.repo.update((domain as any).id, updatePayload);
    const updated = await this.repo.findOneByOrFail({ id: (domain as any).id });
    return this.toDomainEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
