import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'src/types/cart';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private cartModel: Model<Cart>) {}

  async listCartsByUser(userId: string) {
    const carts = await this.cartModel
      .find({ owner: userId })
      .populate('owner')
      .populate('products.product');

    if (!carts) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }
    return carts;
  }
}
