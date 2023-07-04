import { Repository } from 'typeorm';
import { GetProductHandler } from './get-product.handler';
import { GetProductQuery } from './get-product.query';
import { GetProductReponseDto } from '../../dto/get-product/get-product-response.dto';
import { ProductEntity } from '../../entities/product.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('GetProductHandler', () => {
  let getProductHandler: GetProductHandler;
  let productRepository: Repository<ProductEntity>;

  beforeEach(() => {
    productRepository = new Repository<ProductEntity>();
    getProductHandler = new GetProductHandler(productRepository);
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            GetProductHandler,
            {
              provide: getRepositoryToken(ProductEntity),
              useValue: {
                findOne: jest.fn().mockResolvedValue({id: 3}),
              },
            },
          ],
        }).compile();
        getProductHandler = module.get<GetProductHandler>(GetProductHandler);
        productRepository = module.get<Repository<ProductsEntity>>(getRepositoryToken(ProductEntity));
  });
  describe('execute', () => {
    it('should retrieve an existing product and return GetProductReponseDto', async () => {
      // Arrange
      const id = 1;
      const query = new GetProductQuery(id);
      const product = new ProductsEntity();
      const findOneSpy = jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(product);
  
      // Act
      const result = await getProductHandler.execute(query);
  
      // Assert
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id } });
      expect(result).toBeInstanceOf(GetProductReponseDto);
      expect(result.status).toEqual('success');
      expect(result.message).toEqual('product retrieved successfully');
      expect(result.responseCode).toEqual(200);
      expect(result.data).toEqual(product);
    });

    it('should throw HttpException if product does not exist', async () => {
      // Arrange
      const id = 1;
      const query = new GetProductQuery(id);
      const findOneSpy = jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(undefined);
  
      // Act and Assert
      await expect(getProductHandler.execute(query)).rejects.toThrowError(HttpException);
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
