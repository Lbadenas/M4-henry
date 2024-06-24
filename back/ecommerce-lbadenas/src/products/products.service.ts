import { Injectable } from '@nestjs/common';
import { ProducstRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProducstRepository) {}
  getProducts(page: number, limit: number) {
    return this.productRepository.getProducts(page, limit);
  }
  getProduct(id: string) {
    return this.productRepository.getProductById(id);
  }
  addProduct(product: any) {
    return this.productRepository.addProduct(product);
  }
  updateProduct(id: string, user: any) {
    return this.productRepository.updateProduct(id, user);
  }
  deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id);
  }
}
