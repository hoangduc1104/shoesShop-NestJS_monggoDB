import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Order } from './schema/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order')
    private orderModel: mongoose.Model<Order>,
  ) {}

  async listOrdersByUser(id: string): Promise<Order[]> {
    const newId = new mongoose.Types.ObjectId(id);

    const orders = await this.orderModel.find({
      user_id: newId,
    });

    if (!orders) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }
    return orders;
  }
  // async listOrderDetail(id: string): Promise<OrderDetail[]> {
  //   const newId = new mongoose.Types.ObjectId(id);

  //   const orderDetails = await this.orderDetailModel.find({
  //     order_id: newId,
  //   });

  //   if (!orderDetails) {
  //     throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
  //   }
  //   return orderDetails;
  // }
}
