import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from '@/application/controllers/producer/producer.controller';
import { ProducerService } from '@/application/services/producer/producer.service';
import { CreateProducerDto } from '@/domain/producer/dto/create.producer.dto';
import { UpdateProducerDto } from '@/domain/producer/dto/update.producer.dto';
import {
  CreateProducerResponseDto,
  UpdateProducerResponseDto,
} from '@/domain/producer/dto/producer.response.dto';

describe('ProducerController', () => {
  let controller: ProducerController;
  let service: ProducerService;

  const mockService = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [
        {
          provide: ProducerService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(ProducerController);
    service = module.get(ProducerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a producer', async () => {
    const dto: CreateProducerDto = {
      name: 'John Doe',
      taxId: '12345678900',
      email: 'jd@gmail.com',
    };

    const expected: CreateProducerResponseDto = {
      id: 'uuid',
      taxId: '12345678900',
      name: 'John Doe',
      email: 'jd@gmail.com',
      createdAt: new Date(),
    };

    mockService.create.mockResolvedValue(expected);

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expected);
  });

  it('should update a producer', async () => {
    const id = 'uuid';

    const dto: Omit<UpdateProducerDto, 'id'> = { email: 'updated@gmail.com' };

    const expected: UpdateProducerResponseDto = {
      id,
      taxId: '12345678900',
      name: 'John Doe',
      email: 'updated@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockService.update.mockResolvedValue(expected);

    const result = await controller.update(id, dto);

    expect(service.update).toHaveBeenCalledWith({ ...dto, id });
    expect(result).toEqual(expected);
  });
});
