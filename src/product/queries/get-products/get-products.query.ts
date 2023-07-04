import { IQuery } from '@nestjs/cqrs';
import { GetProductsQueryDto } from '../../dto/get-users/get-products.query.dto';

export class GetProductsQuery implements IQuery {
  constructor(public readonly getProductsQueryDto: GetProductsQueryDto) {}
}
