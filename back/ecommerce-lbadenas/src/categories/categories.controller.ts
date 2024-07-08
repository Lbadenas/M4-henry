import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categorieService: CategoriesService) {}

  @Get('seeder')
  addCategories() {
    return this.categorieService.addCategories();
  }
  @Get()
  getCategories() {
    return this.categorieService.getCategories();
  }
}
