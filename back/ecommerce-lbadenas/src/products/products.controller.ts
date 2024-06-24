import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

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
  @Get(`:id`)
  getProduct(@Param(`id`) id: string) {
    return this.productsService.getProduct(id);
  }
  @Post()
  @UseGuards(AuthGuard)
  addUser(@Body() product: any) {
    //validacion se va ahacer ocn un DTO
    return this.productsService.addProduct(product);
  }
  @Put(`:id`)
  @UseGuards(AuthGuard)
  updateProduct(@Param(`id`) id: string, @Body() product: any) {
    return this.productsService.updateProduct(id, product);
  }
  @Delete(`:id`)
  @UseGuards(AuthGuard)
  deleteProduct(@Param(`id`) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
