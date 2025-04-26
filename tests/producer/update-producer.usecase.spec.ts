import { UpdateProducerUseCase } from '@/domain/producer/usecase/update.producer.usecase';
import { Producer } from '@/domain/producer/entities/producer.entity';
import { UpdateProducerDto } from '@/domain/producer/dto/update.producer.dto';
import { NotFoundException } from '@nestjs/common';

describe('UpdateProducerUseCase', () => {
  const mockRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const mockCrypto = {
    hash: jest.fn((val) => `hash-${val}`),
    encrypt: jest.fn((val) => `enc-${val}`),
  };

  const useCase = new UpdateProducerUseCase(
    mockRepository as any,
    mockCrypto as any,
  );

  const taxIdNormalized = '12345678900';
  const taxIdHash = `hash-${taxIdNormalized}`;
  const taxIdEncrypted = `enc-${taxIdNormalized}`;
  const emaildEncrypted = 'enc-jd@gmail.com';
  const name = 'John Doe';
  const id = 'uuid';

  const currentProducerEntity = new Producer(
    id,
    taxIdEncrypted,
    taxIdHash,
    name,
    emaildEncrypted,
    new Date('24/04/2025'),
    new Date('24/04/2025'),
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update producer with new name and new email', async () => {
    const dto: UpdateProducerDto = {
      id: 'uuid',
      name: 'New Name',
      email: 'UpdateEmail@gmail.com',
    };

    mockRepository.findById.mockResolvedValue(currentProducerEntity);
    mockCrypto.encrypt.mockReturnValue(emaildEncrypted);
    mockRepository.update.mockImplementation(async (producer) => producer);

    const result = await useCase.execute(dto);

    expect(mockRepository.findById).toHaveBeenCalledWith('uuid');
    expect(mockCrypto.encrypt).toHaveBeenCalledWith(dto.email);
    expect(mockRepository.update).toHaveBeenCalled();
    expect(result.name).toBe('New Name');
    expect(result.email).toBe(emaildEncrypted);
  });

  it('should keep original fields if not provided in DTO', async () => {
    const dto: UpdateProducerDto = {
      id: 'uuid',
      name,
      email: 'jd@gmail.com',
    };

    mockRepository.findById.mockResolvedValue(currentProducerEntity);
    mockRepository.update.mockImplementation(async (producer) => producer);

    const result = await useCase.execute(dto);

    expect(result.name).toBe(name);
    expect(result.email).toBe(emaildEncrypted);
  });

  it('should throw ProducerNotFoundException if producer not found', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({
        id: 'non-existent-id',
        email: 'update-email@gmao.com',
        name: 'John Doe',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
