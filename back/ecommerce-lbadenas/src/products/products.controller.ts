import {
  Controller,
  Get,
  Put,
  Query,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from 'src/dto/Products.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';
import { RolesGuards } from 'src/auth/guards/roles.guard';

@ApiTags('products')
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

  @Get(':id')
  getProductsById(@Param(`id`, ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }
  @ApiBearerAuth()
  @Put(`:id`)
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuards)
  updateProduct(
    @Param(`id`, ParseUUIDPipe) id: string,
    @Body() product: Partial<UpdateProductDto>,
  ) {
    return this.productsService.updateProducts(id, product);
  }
}
