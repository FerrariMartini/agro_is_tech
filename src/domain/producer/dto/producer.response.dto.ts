export class CreateProducerResponseDto {
  id: string;
  taxId: string;
  name: string;
  email: string;
  createdAt: Date;
}

export class UpdateProducerResponseDto {
  id: string;
  taxId: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProducerResponseDto {
  id: string;
  taxId: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
