import { Injectable, Inject } from '@nestjs/common';
import { Producer } from '../entities/producer.entity';
import {
  PRODUCER_REPOSITORY,
  ProducerRepository,
} from '../repositories/producer.repository.interface';
import {
  CRYPTO_SERVICE,
  CryptoService,
} from '@/shared/crypto/crypto.service.interface';
import { CreateEntityUseCase } from '@/shared/usecase/create.entity.usecase';
import { CreateProducerDto } from '../dto/create.producer.dto';
import { v4 as uuidv4 } from 'uuid';
import { removeNonDigits } from '@/shared/utils/formatters';
import { DuplicateTaxIdException } from '../exceptions/producer.exception';

@Injectable()
export class CreateProducerUseCase extends CreateEntityUseCase<Producer> {
  constructor(
    @Inject(PRODUCER_REPOSITORY)
    private readonly repository: ProducerRepository,
    @Inject(CRYPTO_SERVICE)
    private readonly crypto: CryptoService,
  ) {
    super(repository);
  }

  async execute(dto: CreateProducerDto): Promise<Producer> {
    const normalizedTaxId = removeNonDigits(dto.taxId);
    const taxIdHash = this.crypto.hash(normalizedTaxId);
    const producerFound = await this.repository.findByTaxIdHash(taxIdHash);

    if (producerFound) DuplicateTaxIdException();

    const taxIdEncrypted = this.crypto.encrypt(normalizedTaxId);
    const emailEncrypted = this.crypto.encrypt(dto.email);

    const now = new Date();

    const producer = new Producer(
      uuidv4(),
      taxIdEncrypted,
      taxIdHash,
      dto.name,
      emailEncrypted,
      now,
      now,
      null,
    );

    return this.repository.create(producer);
  }
}
