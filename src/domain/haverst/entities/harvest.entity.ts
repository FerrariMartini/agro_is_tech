export class Harvest {
  constructor(
    public readonly id: string,
    public year: number,
    public propertyId: string,
    public description: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null = null,
  ) {}
}
