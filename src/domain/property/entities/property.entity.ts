export class Property {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public state: string,
    public totalArea: number,
    public arableArea: number,
    public vegetationArea: number,
    public producerId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null = null,
  ) {}
}
