import { Injectable, Inject } from '@nestjs/common';
import { Producer } from '../entities/producer.entity';
import {
  PRODUCER_REPOSITORY,
  ProducerRepository,
} from '../repositories/producer.repository.interface';
import { UpdateProducerDto } from '../dto/update.producer.dto';
import { ProducerNotFoundException } from '../exceptions/producer.exception';
import {
  CRYPTO_SERVICE,
  CryptoService,
} from '@/shared/crypto/crypto.service.interface';
import { UpdateEntityUseCase } from '@/shared/usecase/update.entity.usecase';

@Injectable()
export class UpdateProducerUseCase extends UpdateEntityUseCase<Producer> {
  constructor(
    @Inject(PRODUCER_REPOSITORY)
    private readonly repository: ProducerRepository,
    @Inject(CRYPTO_SERVICE)
    private readonly crypto: CryptoService,
  ) {
    super(repository);
  }

  async execute(dto: UpdateProducerDto): Promise<Producer> {
    const found = await this.repository.findById(dto.id);

    if (!found) ProducerNotFoundException();

    const newName = dto?.name ? dto.name : found.name;
    const newEmail = dto?.email ? this.crypto.encrypt(dto.email) : found.email;

    const newProducer = new Producer(
      found.id,
      found.taxId,
      found.taxIdHash,
      newName,
      newEmail,
      found.createdAt,
      new Date(),
      null,
    );

    return this.repository.update(newProducer);
  }
}
