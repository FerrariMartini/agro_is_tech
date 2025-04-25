import { Test, TestingModule } from '@nestjs/testing';
import { Controller } from '@nestjs/common';
import { BaseCrudService } from '@/application/services/base.crud.service';
import { BaseCrudController } from '@/application/controllers/base.crud.controller';

describe('BaseCrudController', () => {
  type Entity = { id: string; name: string };

  const mockService: Partial<
    BaseCrudService<Entity, Entity, Entity, Entity, any, any>
  > = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  };

  @Controller('test-entities')
  class TestController extends BaseCrudController<Entity> {
    constructor() {
      super(mockService as any);
    }
  }

  let controller: TestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();

    controller = module.get(TestController);
  });

  it('should call create on service', async () => {
    const dto = { name: 'Test' };
    const expected = { id: 'uuid', name: 'Test' };
    mockService.create = jest.fn().mockResolvedValue(expected);

    const result = await controller.create(dto);

    expect(mockService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expected);
  });

  it('should call update on service', async () => {
    const dto = { name: 'Updated' };
    const id = 'uuid';
    const expected = { id, name: 'Updated' };
    mockService.update = jest.fn().mockResolvedValue(expected);

    const result = await controller.update(id, dto);

    expect(mockService.update).toHaveBeenCalledWith({ ...dto, id });
    expect(result).toEqual(expected);
  });

  it('should call findAll on service', async () => {
    const expected = [{ id: '1', name: 'One' }];
    mockService.findAll = jest.fn().mockResolvedValue(expected);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it('should call findById on service', async () => {
    const expected = { id: '1', name: 'One' };
    mockService.findById = jest.fn().mockResolvedValue(expected);

    const result = await controller.findById('1');

    expect(mockService.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(expected);
  });

  it('should call delete on service', async () => {
    mockService.delete = jest.fn().mockResolvedValue(undefined);

    await controller.delete('1');

    expect(mockService.delete).toHaveBeenCalledWith('1');
  });
});
