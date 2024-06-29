import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/orders.dto.ts';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, Products } = order;
    return this.orderService.addOrder(userId, Products);
  }

  @Get()
  getorder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
