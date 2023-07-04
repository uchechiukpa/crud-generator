import { Repository } from 'typeorm';
import { UpdateProductHandler } from './update-product.handler';
import { UpdateProductCommand } from './update-product.command';
import { CreatedProductReponseObject } from '../../dto/create-product/create-product-response.dto';
import { ProductEntity } from '../../entities/product.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UpdateProductHandler', () => {
  let updateProductHandler: UpdateProductHandler;
  let productRepository: Repository<ProductEntity>;

  beforeEach(() => {
    productRepository = new Repository<ProductEntity>();
    updateProductHandler = new UpdateProductHandler(productRepository);
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            UpdateProductHandler,
            {
              provide: getRepositoryToken(ProductEntity),
              useValue: {
                findOne: jest.fn().mockResolvedValue(null),
                save: jest.fn().mockResolvedValue(undefined),
              },
            },
          ],
        }).compile();
    updateProductHandler = module.get<UpdateProductHandler>(UpdateProductHandler);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
 
  });

  describe('execute', () => {
    it('should update an existing product and return CreatedProductReponseObject', async () => {
      // Arrange
      const id = 1;
      const updateProductDto = { /* provide the necessary update data for the product */ };
      const command = new UpdateProductCommand(id, updateProductDto);
      const product = new ProductEntity();
      const findOneSpy = jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(product);
      const saveSpy = jest.spyOn(productRepository, 'save').mockResolvedValueOnce();
  
      // Act
      const result = await updateProductHandler.execute(command);
  
      // Assert
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id } });
      expect(saveSpy).toHaveBeenCalledWith(product);
      expect(result).toBeInstanceOf(CreatedProductReponseObject);
      expect(result.status).toEqual('success');
      expect(result.message).toEqual('product updated successfully');
      expect(result.responseCode).toEqual(201);
    });

    it('should throw HttpException if product does not exist', async () => {
      // Arrange
      const id = 1;
      const updateProductDto = { /* provide the necessary update data for the product */ };
      const command = new UpdateProductCommand(id, updateProductDto);
      const findOneSpy = jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(undefined);
  
      // Act and Assert
      await expect(updateProductHandler.execute(command)).rejects.toThrowError(HttpException);
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
