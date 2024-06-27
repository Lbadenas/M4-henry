import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  addOrder(userId: string, Products: any) {
    return this.ordersRepository.addOrder(userId, Products);
  }
  getOrder(id: string) {
    return this.getOrder(id);
  }
}
