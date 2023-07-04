import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductController } from './product.controller';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class ProductModule {}
