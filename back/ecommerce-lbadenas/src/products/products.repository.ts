import { Injectable } from '@nestjs/common';

@Injectable()
export class ProducstRepository {
  private products = [
    {
      id: 1,

      name: 'guitarra',

      description: 'fender',

      price: 1000,

      stock: true,

      imgUrl: 'foto de guitarra',
    },
  ];

  async getProducts() {
    return this.products;
  }
}
