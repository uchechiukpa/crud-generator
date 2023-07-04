import { HttpException, HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { ProductEntity } from "../../entities/product.entity";
import { CreatedProductReponseObject } from "../../dto/create-product/create-product-response.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateProductCommand } from "./update-product.command";

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async execute(
    command: UpdateProductCommand
  ): Promise<CreatedProductReponseObject> {
    const { id, updateProductDto } = command;

    const product = await this.checkProductExist(id);

    Object.assign(product, updateProductDto);
    await this.productRepository.save(product);
    return new CreatedProductReponseObject({
      status: "success",
      message: "product updated successfully",
      responseCode: 201,
    });
  }
  async checkProductExist(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException(
        "product with this id does not exist",
        HttpStatus.BAD_REQUEST
      );
    }
    return product;
  }
}
