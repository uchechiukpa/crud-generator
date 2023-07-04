import { HttpException, HttpStatus } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { GetProductsReponseDto } from "../../dto/get-products/get-products-response.dto";
import { GetProductsReponseDto } from "../../dto/get-products/get-products-response.dto";
import { ProductEntity } from "../../entities/products.entity";
import { GetProductsQuery } from "./get-products.query";

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    @InjectRepository(ProductsEntity)
    private ProductRepository: Repository<ProductEntity>
  ) {}

  async execute(query: GetProductsQuery): Promise<GetProductsReponseDto> {
    const {
      getProductsQueryDto: { limit, offset },
    } = query;
    const products = await this.productRepository.find({where: {id:MoreThan(offset)}, take: limit || 0})

    return new GetProductsReponseDto({
      status: "success",
      message: "products retrieved successfully",
      responseCode: 200,
      data: products,
    });
  }
}
