import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';
import { log } from 'console';
import { UpdateProductDto } from 'src/dto/Products.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    let products = await this.productRepository.find({
      relations: {
        category: true,
      },
      order: {
        id: 'ASC',
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }
  async getProductById(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async addProducts() {
    //verificamos que exista la categoria
    //LANZA ERROR SI NO EXISTECATEGORIA
    const categories = await this.categoriesRepository.find();
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      // creamos un nuevo producto y seteamos atributos
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.imgUrl = element.imgUrl;
      product.stock = element.stock;
      product.category = category;
      //grabamos el nuevo producto
      await this.productRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        //si el producto existe lo actualizamos
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name']) //si existe le cambia todo menos el nombre
        .execute();
    });

    return 'Productos agregados';
  }

  async updateProduct(id: string, product: Partial<UpdateProductDto>) {
    // Verificar si el producto existe
    const existingProduct = await this.productRepository.findOneBy({ id });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Actualizar el producto
    await this.productRepository.update(id, product);

    // Obtener el producto actualizado
    const updatedProduct = await this.productRepository.findOneBy({ id });
    return updatedProduct;
  }
}
