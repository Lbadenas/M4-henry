import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderdetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

//indagar en el metodo de typeorm transacciones para hacer el addorder
@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}
  async addOrder(userId: string, products: any) {
    let total = 0;

    //verificamos que el usuario exista
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      return `usuario con ${userId} no encontrado`;
    }
    // creamos la orden
    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);
    //asoccio cada id recibido con el producto
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });
        if (!product) {
          return `producto con el ${element.id} no encontrado`;
        }
        //calculamos el monto total
        total += Number(product.price);
        //actualizamos el stock
        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );
    // creamor el orderdetail y la insertamos en BBDD
    const orderDetail = new OrderDetails();

    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.orderDetailRepository.save(orderDetail);
    // Enviamos al cliente la compra con la info de productos
    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }
  getOrder(id: string) {
    const order = this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order) {
      return `orden con id ${id}no encontrada`;
    }
    return order;
  }
}
