import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProducstRepository } from './products.repository';

@Module({
  providers: [ProductsService, ProducstRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}
