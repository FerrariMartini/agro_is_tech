import {
  CRYPTO_SERVICE,
  CryptoService,
} from '@/shared/crypto/crypto.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Producer } from '../../domain/producer/entities/producer.entity';
import {
  CreateProducerResponseDto,
  ProducerResponseDto,
} from '../../domain/producer/dto/producer.response.dto';

@Injectable()
export class ProducerMapper {
  constructor(
    @Inject(CRYPTO_SERVICE)
    private readonly crypto: CryptoService,
  ) {}

  toCreateResponse(producer: Producer): CreateProducerResponseDto {
    return {
      id: producer.id,
      taxId: this.crypto.decrypt(producer.taxId),
      name: producer.name,
      email: this.crypto.decrypt(producer.email),
      createdAt: producer.createdAt,
    };
  }

  toResponse(producer: Producer): ProducerResponseDto {
    return {
      id: producer.id,
      taxId: this.crypto.decrypt(producer.taxId),
      name: producer.name,
      email: this.crypto.decrypt(producer.email),
      createdAt: producer.createdAt,
      updatedAt: producer.updatedAt,
    };
  }

  toResponseList(producers: Producer[]): ProducerResponseDto[] {
    return producers.map((p) => this.toResponse(p));
  }
}
