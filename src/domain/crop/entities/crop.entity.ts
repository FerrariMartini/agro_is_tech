export class Crop {
  constructor(
    public readonly id: string,
    public description: string,
    public seed: string,
    public harvestId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null = null,
  ) {}
}
