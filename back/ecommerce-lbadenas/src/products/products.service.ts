import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/entities/products.entity';
import { UpdateProductDto } from 'src/dto/Products.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }
  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }
  updateProducts(id: string, product: Partial<UpdateProductDto>) {
    return this.productsRepository.updateProduct(id, product);
  }
}
