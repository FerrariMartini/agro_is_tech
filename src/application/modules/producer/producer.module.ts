import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerController } from '@/application/controllers/producer/producer.controller';
import { ProducerService } from '@/application/services/producer/producer.service';
import { PRODUCER_REPOSITORY } from '@/domain/producer/repositories/producer.repository.interface';
import { ProducerUseCaseFactory } from '@/domain/producer/usecase/producer.usecase.factory';
import { CRYPTO_SERVICE } from '@/shared/crypto/crypto.service.interface';
import { NodeCryptoService } from '@/infrastructure/cryptography/crypto.service';
import { ProducerOrmEntity } from '@/infrastructure/database/typeorm/entities/producer.orm.entity';
import { TypeOrmProducerRepository } from '@/infrastructure/database/typeorm/repositories/producer.repository';
import { ProducerMapper } from '@/application/mappers/producer.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerOrmEntity])],
  controllers: [ProducerController],
  exports: [ProducerService],
  providers: [
    {
      provide: CRYPTO_SERVICE,
      useClass: NodeCryptoService,
    },
    {
      provide: PRODUCER_REPOSITORY,
      useClass: TypeOrmProducerRepository,
    },
    ProducerUseCaseFactory,
    ProducerService,
    ProducerMapper,
  ],
})
export class ProducerModule {}
