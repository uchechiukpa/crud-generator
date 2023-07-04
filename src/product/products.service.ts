import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(product: Product) {
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne(id);
  }

  async update(id: number, product: Product) {
    await this.productRepository.update(id, product);
    return this.productRepository.findOne(id);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}

