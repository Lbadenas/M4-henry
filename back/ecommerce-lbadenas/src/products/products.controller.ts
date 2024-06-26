import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products') // Define la ruta a /users
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query(`page`) page: string, @Query(`limit`) limit: string) {
    !page ? (page = `1`) : page;
    !limit ? (limit = `5`) : limit;
    if (page && limit)
      return this.productsService.getProducts(Number(page), Number(limit)); // Simplemente con el return del método alcanza, no tengo que usar req ni res
  }
  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }
}
