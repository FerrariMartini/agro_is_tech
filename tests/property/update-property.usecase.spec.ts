import { UpdatePropertyUseCase } from '@/domain/property/usecase/update.property.usecase';
import { UpdatePropertyDto } from '@/domain/property/dto/update.property.dto';
import { Property } from '@/domain/property/entities/property.entity';
import { validateArea } from '@/domain/property/util/area.validation';
import { BadRequestException, NotFoundException } from '@nestjs/common';

jest.mock('@/domain/property/util/area.validation');

describe('UpdatePropertyUseCase', () => {
  const mockRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const useCase = new UpdatePropertyUseCase(mockRepository as any);

  const existingProperty = new Property(
    'property-uuid',
    'Fazenda Nova America',
    'Assis',
    'SP',
    1000,
    600,
    400,
    '94740606-d4c3-4879-8df2-6cd44b84c306',
    new Date('2024-01-01'),
    new Date('2024-01-02'),
    null,
  );

  const updateDto: UpdatePropertyDto = {
    id: 'property-uuid',
    name: 'Fazenda Nova America',
    city: 'Assis',
    state: 'SP',
    totalArea: 2000,
    arableArea: 1800,
    vegetationArea: 200,
    producerId: '94740606-d4c3-4879-8df2-6cd44b84c306',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update property successfully', async () => {
    mockRepository.findById.mockResolvedValue(existingProperty);
    mockRepository.update.mockImplementation(async (property) => property);

    const result = await useCase.execute(updateDto);

    expect(mockRepository.findById).toHaveBeenCalledWith(updateDto.id);
    expect(validateArea).toHaveBeenCalledWith({
      arableArea: updateDto.arableArea,
      totalArea: updateDto.totalArea,
      vegetationArea: updateDto.vegetationArea,
    });
    expect(mockRepository.update).toHaveBeenCalled();
    expect(result.name).toBe(updateDto.name);
    expect(result.city).toBe(updateDto.city);
  });

  it('should throw PropertyNotFoundException if property not found', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(updateDto)).rejects.toThrow(NotFoundException);
  });

  it('should throw error if area validation fails', async () => {
    mockRepository.findById.mockResolvedValue(existingProperty);

    (validateArea as jest.Mock).mockImplementationOnce(() => {
      throw new BadRequestException();
    });

    await expect(useCase.execute(updateDto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
