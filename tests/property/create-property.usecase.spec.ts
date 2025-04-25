import { CreatePropertyUseCase } from '@/domain/property/usecase/create.property.usecase';
import { CreatePropertyDto } from '@/domain/property/dto/create.property.dto';
import { Property } from '@/domain/property/entities/property.entity';
import { validateArea } from '@/domain/property/util/area.validation';
import { BadRequestException } from '@nestjs/common';

jest.mock('@/domain/property/util/area.validation');

describe('CreatePropertyUseCase', () => {
  const mockRepository = {
    create: jest.fn(),
  };

  const useCase = new CreatePropertyUseCase(mockRepository as any);

  const dto: CreatePropertyDto = {
    name: 'Fazenda Nova America',
    city: 'Assis',
    state: 'SP',
    totalArea: 1000,
    arableArea: 600,
    vegetationArea: 400,
    producerId: '94740606-d4c3-4879-8df2-6cd44b84c306',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create property successfully', async () => {
    const expectedProperty = new Property(
      'generated-uuid',
      dto.name,
      dto.city,
      dto.state,
      dto.totalArea,
      dto.arableArea,
      dto.vegetationArea,
      dto.producerId,
      new Date(),
      new Date(),
      null,
    );

    mockRepository.create.mockResolvedValue(expectedProperty);

    const result = await useCase.execute(dto);

    expect(validateArea).toHaveBeenCalledWith({
      arableArea: dto.arableArea,
      totalArea: dto.totalArea,
      vegetationArea: dto.vegetationArea,
    });

    expect(mockRepository.create).toHaveBeenCalled();
    expect(result.name).toBe(dto.name);
    expect(result.city).toBe(dto.city);
    expect(result.totalArea).toBe(dto.totalArea);
  });

  it('should throw error if area validation fails', async () => {
    (validateArea as jest.Mock).mockImplementationOnce(() => {
      throw new BadRequestException();
    });

    await expect(useCase.execute(dto)).rejects.toThrow(BadRequestException);
  });
});
