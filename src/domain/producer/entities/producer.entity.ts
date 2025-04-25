export class Producer {
  constructor(
    public readonly id: string,
    public taxId: string,
    public taxIdHash: string,
    public name: string,
    public email: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null = null,
  ) {}
}
