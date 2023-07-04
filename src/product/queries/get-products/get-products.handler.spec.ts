import { Repository } from 'typeorm';
import { GetProductsHandler } from './get-products.handler';
import { GetProductsQuery } from './get-products.query';
import { GetProductsReponseDto } from '../../dto/get-products/get-products-response.dto';

describe('GetProductsHandler', () => {
  let getProductsHandler: GetProductsHandler;
  let productRepository: Repository<ProductEntity>;
  
  beforeEach(() => {
    productRepository = new Repository<ProductEntity>();
    getProductsHandler = new GetProductsHandler(productsRepository);
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            GetProductsHandler,
            {
              provide: getRepositoryToken(ProductEntity),
              useValue: {
                findOne: jest.fn().mockResolvedValue([{id: 3}, {id: 5}]),
              },
            },
          ],
        }).compile();
        getProductsHandler = module.get<GetProductsHandler>(GetProductsHandler);
        productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
  });
  describe('execute', () => {
    it('should retrieve products and return GetProductsReponseDto', async () => {
      // Arrange
      const limit = 10;
      const offset = 0;
      const getProductsQueryDto = { limit, offset };
      const query = new GetProductsQuery(getProductsQueryDto);
      const products = [{ id: 1 }, { id: 2 }]; // Mock products array with plain JavaScript objects
      const findSpy = jest.spyOn(productRepository, 'find').mockResolvedValueOnce(products);
  
      // Act
      const result = await getProductsHandler.execute(query);
  
      // Assert
      expect(findSpy).toHaveBeenCalled();
      expect(result).toBeInstanceOf(GetProductsReponseDto);
      expect(result.status).toEqual('success');
      expect(result.message).toEqual('products retrieved successfully');
      expect(result.responseCode).toEqual(200);
      expect(result.data).toEqual(products);
    });
  });
});
