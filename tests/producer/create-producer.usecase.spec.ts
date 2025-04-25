import { CreateProducerUseCase } from '@/domain/producer/usecase/create.producer.usecase';
import { Producer } from '@/domain/producer/entities/producer.entity';
import { CreateProducerDto } from '@/domain/producer/dto/create.producer.dto';
import { removeNonDigits } from '@/shared/utils/formatters';
import { ConflictException } from '@nestjs/common';

jest.mock('@/shared/utils/formatters', () => ({
  removeNonDigits: jest.fn((value) => value.replace(/\D/g, '')),
}));

describe('CreateProducerUseCase', () => {
  const mockRepo = {
    findByTaxIdHash: jest.fn(),
    create: jest.fn(),
  };

  const mockCrypto = {
    hash: jest.fn((val) => `hash-${val}`),
    encrypt: jest.fn((val) => `enc-${val}`),
  };

  const useCase = new CreateProducerUseCase(mockRepo as any, mockCrypto as any);

  afterEach(() => jest.clearAllMocks());

  it('should create a new producer with encrypted and hashed taxId', async () => {
    const dto: CreateProducerDto = {
      name: 'John Doe',
      taxId: '123.456.789-00',
      email: 'jd@gmail.com',
    };

    const normalized = '12345678900';
    const hash = `hash-${normalized}`;
    const encrypted = `enc-${normalized}`;

    mockRepo.findByTaxIdHash.mockResolvedValue(null);
    const createdProducer = new Producer(
      'uuid',
      encrypted,
      hash,
      dto.name,
      dto.email,
      new Date(),
      new Date(),
      null,
    );
    mockRepo.create.mockResolvedValue(createdProducer);

    const result = await useCase.execute(dto);

    expect(removeNonDigits).toHaveBeenCalledWith(dto.taxId);
    expect(mockCrypto.hash).toHaveBeenCalledWith(normalized);
    expect(mockCrypto.encrypt).toHaveBeenCalledWith(normalized);
    expect(mockRepo.findByTaxIdHash).toHaveBeenCalledWith(hash);
    expect(mockRepo.create).toHaveBeenCalledWith(expect.any(Producer));
    expect(result.name).toBe(dto.name);
    expect(result.taxId).toBe(encrypted);
  });

  it('should throw DuplicateTaxIdException if hash already exists', async () => {
    mockRepo.findByTaxIdHash.mockResolvedValue({ id: 'existing' });

    await expect(
      useCase.execute({
        name: 'Jane',
        taxId: '11122233344',
        email: 'jj@gmail.com',
      }),
    ).rejects.toThrow(ConflictException);
  });
});
