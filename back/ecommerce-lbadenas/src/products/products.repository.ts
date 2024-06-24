import { Injectable } from '@nestjs/common';

export interface Products {
  id: string;
  name: string;
  description: string;
  password: string;
  price: string;
  stock: string;
  imgUrl?: string | undefined;
}
const products: Products[] = [
  {
    id: '1',
    name: 'Laptop',
    description: 'Laptop de alta gama con 16GB de RAM y 512GB de SSD',
    password: 'laptop123',
    price: '1500',
    stock: '10',
    imgUrl: 'https://example.com/laptop.jpg',
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Smartphone con pantalla AMOLED y 128GB de almacenamiento',
    password: 'smartphone123',
    price: '700',
    stock: '25',
    imgUrl: 'https://example.com/smartphone.jpg',
  },
  {
    id: '3',
    name: 'Auriculares',
    description: 'Auriculares inalámbricos con cancelación de ruido',
    password: 'headphones123',
    price: '200',
    stock: '50',
  },
];

@Injectable()
export class ProducstRepository {
  async getProducts(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const productsList = products.slice(start, end);
    return productsList;
  }
  async getProductById(id: string) {
    //verifico que el usuario exista
    const foundProduct = products.findIndex((u) => u.id === id);
    if (foundProduct === -1) return `no se encontro usuario con ${id}`;
    // quitamos el password del usuario que encontro

    return foundProduct;
  }
  async addProduct(product: Products) {
    products.push({ ...product, id: product.id });
    return product.id;
  }

  async updateProduct(id: string, product: Products) {
    //verifico que exista el usuario
    const foundProduct = products.findIndex((u) => u.id === id);
    if (foundProduct === -1) return `no se encontro un producto con ${id}`;
    products[foundProduct] = { ...products[foundProduct], ...product };
    return products[foundProduct].id;
  }
  async deleteProduct(id: string) {
    //verifico que exista el usuario
    const foundProduct = products.findIndex((u) => u.id === id);
    if (foundProduct === -1) return `no se encontro un producto con ${id}`;
    products.splice(foundProduct, 1);
    return id;
    // si yo tengo [0,1,2,3] al borrar un solo elemento con el splice quedaria [0,1,3]
  }
}
