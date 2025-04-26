import { CreateProducerUseCase } from '@/domain/producer/usecase/create.producer.usecase';
import { Producer } from '@/domain/producer/entities/producer.entity';
import { removeNonDigits } from '@/shared/utils/formatters';
import { ConflictException } from '@nestjs/common';
import { CreateProducerDto } from '@/domain/producer/dto/create.producer.dto';

jest.mock('@/shared/utils/formatters', () => ({
  removeNonDigits: jest.fn((value) => value.replace(/\D/g, '')),
}));

describe('CreateProducerUseCase', () => {
  const mockRepo = {
    findByTaxIdHash: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockCrypto = {
    hash: jest.fn((val) => `hash-${val}`),
    encrypt: jest.fn((val) => `enc-${val}`),
  };

  const useCase = new CreateProducerUseCase(mockRepo as any, mockCrypto as any);

  afterEach(() => jest.clearAllMocks());

  const dto: CreateProducerDto = {
    name: 'John Doe',
    taxId: '123.456.789-00',
    email: 'jd@gmail.com',
  };

  const normalized = '12345678900';
  const taxIdHash = `hash-${normalized}`;
  const taxIdEncrypted = `enc-${normalized}`;
  const emailEncrypted = `enc-${dto.email}`;

  const createdAndActiveProducer = new Producer(
    'uuid',
    taxIdEncrypted,
    taxIdHash,
    dto.name,
    emailEncrypted,
    new Date(),
    new Date(),
    null,
  );
  it('should create a new producer with encrypted and hashed taxId', async () => {
    mockRepo.findByTaxIdHash.mockResolvedValue(null);
    mockRepo.create.mockResolvedValue(createdAndActiveProducer);

    const result = await useCase.execute(dto);

    expect(removeNonDigits).toHaveBeenCalledWith(dto.taxId);
    expect(mockCrypto.hash).toHaveBeenCalledWith(normalized);
    expect(mockCrypto.encrypt).toHaveBeenCalledWith(normalized);
    expect(mockCrypto.encrypt).toHaveBeenCalledWith(dto.email);
    expect(mockRepo.findByTaxIdHash).toHaveBeenCalledWith(taxIdHash);
    expect(mockRepo.create).toHaveBeenCalledWith(expect.any(Producer));
    expect(result.name).toBe(dto.name);
    expect(result.taxId).toBe(taxIdEncrypted);
    expect(result.email).toBe(emailEncrypted);
  });

  it('should throw ConflictException if producer with taxId is active', async () => {
    mockRepo.findByTaxIdHash.mockResolvedValue(createdAndActiveProducer);
    await expect(useCase.execute(dto)).rejects.toThrow(ConflictException);
  });

  it('should reactivate a soft-deleted producer', async () => {
    const softDeletedProducer = new Producer(
      'id',
      taxIdEncrypted,
      taxIdHash,
      dto.name,
      emailEncrypted,
      new Date('2020-01-01'),
      new Date('2020-01-01'),
      new Date('2024-01-01'),
    );

    mockRepo.findByTaxIdHash.mockResolvedValue(softDeletedProducer);
    mockRepo.update.mockImplementation(async (producer) => producer);

    const result = await useCase.execute(dto);

    expect(mockRepo.update).toHaveBeenCalledWith(expect.any(Producer));
    expect(result.id).toBe('id');
    expect(result.name).toBe(dto.name);
    expect(result.email).toBe(emailEncrypted);
    expect(result.deletedAt).toBeNull();
  });
});
