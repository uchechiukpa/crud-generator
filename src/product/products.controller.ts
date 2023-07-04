import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateProductCommand } from './commands/create-product.command';
import { UpdateProductCommand } from './commands/update-product.command';
import { GetProductQuery } from './queries/get-product.query';
import { GetProductsQuery } from './queries/get-products.query';

@Controller('product')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.commandBus.execute(new CreateProductCommand(createProductDto));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetProductsQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.commandBus.execute(new UpdateProductCommand(id, updateProductDto));
  }
}

