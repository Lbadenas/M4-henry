import { Injectable } from '@nestjs/common';
import { ProducstRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProducstRepository) {}
  getProducts() {
    return this.productRepository.getProducts();
  }
}
