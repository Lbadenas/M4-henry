import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/orders.dto.ts';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, Products } = order;

    return this.orderService.addOrder(userId, Products);
  }
  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard)
  getorder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
