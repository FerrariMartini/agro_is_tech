import { Injectable, Inject } from '@nestjs/common';
import { Producer } from '../entities/producer.entity';
import {
  ProducerRepository,
  PRODUCER_REPOSITORY,
} from '../repositories/producer.repository.interface';

import { CreateProducerUseCase } from './create.producer.usecase';
import { UpdateProducerUseCase } from './update.producer.usecase';

import {
  CRYPTO_SERVICE,
  CryptoService,
} from '@/shared/crypto/crypto.service.interface';
import { GenericUseCaseFactory } from '@/shared/usecase/generic.usecase.factory';

@Injectable()
export class ProducerUseCaseFactory extends GenericUseCaseFactory<Producer> {
  constructor(
    @Inject(PRODUCER_REPOSITORY)
    protected readonly repository: ProducerRepository,

    @Inject(CRYPTO_SERVICE)
    protected readonly crypto: CryptoService,
  ) {
    super(repository);
  }

  create(): CreateProducerUseCase {
    return new CreateProducerUseCase(this.repository, this.crypto);
  }

  update(): UpdateProducerUseCase {
    return new UpdateProducerUseCase(this.repository, this.crypto);
  }
}
