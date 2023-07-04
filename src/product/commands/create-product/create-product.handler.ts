import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { CreateProductCommand } from './create-product.command';
import { CreatedProductReponseObject } from '../../dto/create-product/create-product-response.dto';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
    ) {}

  async execute(
    command: CreateProductCommand,
  ): Promise<CreatedProductReponseObject> {
    const {
      createProductDto,
    } = command;
    await this.productRepository.save(createProductDto);
    return new CreatedProductReponseObject({
        status: 'success',
        message: "product created successfully",
        responseCode: 201
    });
  }
}
