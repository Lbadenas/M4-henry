import { Controller, Get } from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products') // Define la ruta a /users
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts(); // Simplemente con el return del método alcanza, no tengo que usar req ni res
  }
}
