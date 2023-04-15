import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':id')
  @UseGuards(AuthGuard())
  async listOrders(@Param('id') id: string): Promise<Order[]> {
    try {
      return this.orderService.listOrdersByUser(id);
    } catch (error) {
      console.log(error);
    }
  }

  // @Get('detail/:id')
  // @UseGuards(AuthGuard())
  // async listOrderDetails(@Param('id') id: string): Promise<OrderDetail[]> {
  //   try {
  //     return this.orderService.listOrderDetail(id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
