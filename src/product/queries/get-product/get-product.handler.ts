import { HttpException, HttpStatus } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetProductReponseDto } from "../../dto/get-product/get-product-response.dto";
import { ProductsEntity } from "../../entities/product.entity";
import { GetProductQuery } from "./get-product.query";

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>
  ) {}

  async execute(query: GetProductQuery): Promise<GetProductReponseDto> {
    const { id } = query;
    const product = await this.checkProductExist(id);

    return new GetProductReponseDto({
      status: "success",
      message: "product retrieved successfully",
      responseCode: 200,
      data: product,
    });
  }

  async checkProductExist(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException("product not found", HttpStatus.NOT_FOUND);
    }
    return product;
  }
}
