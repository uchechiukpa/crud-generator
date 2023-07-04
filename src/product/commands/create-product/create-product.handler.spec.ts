import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductHandler } from './create-product.handler';
import { ProductEntity } from '../../entities/product.entity';
import { CreateProductCommand } from './create-product.command';

describe('CreateProductHandler', () => {
  let createProductHandler: CreateProductHandler;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductHandler,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockReturnValue({}),
            save: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    createProductHandler = module.get<CreateProductHandler>(CreateProductHandler);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
  });

  it('should create a new product successfully', async () => {
    const command = new CreateProductCommand({
      id: 4
    });

    await createProductHandler.execute(command);
    expect(productRepository.create).toBeCalled();
    expect(productRepository.save).toBeCalled();
  });
});
