import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Cart } from 'src/types/cart';
import { AddToCartDTO } from './dtos/addToCart.dto';
import { Query } from 'express-serve-static-core';

import { Product } from 'src/product/schema/product.schema';
import { UpdateCartDTO } from './dtos/updateProductInCart';

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

  async addToCart(addDto: AddToCartDTO, userId: string) {
    const carts = await this.cartModel.find({ owner: userId });

    if (carts.length == 0) {
      await this.cartModel.create({
        owner: new mongoose.Types.ObjectId(userId),
      });
    }
    await this.cartModel.findOneAndUpdate(
      { owner: userId },
      { $push: { products: addDto } },
      // function (error, success) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log(success);
      //   }
      // },
    );

    return carts;
  }

  async deleteProductInCart(query: Query): Promise<Cart[]> {
    const carts = await this.cartModel.find({ owner: query.user_id });
    const newid = query.user_id.toString();

    if (carts.length == 0) {
      await this.cartModel.create({
        owner: new mongoose.Types.ObjectId(newid),
      });
    }

    await this.cartModel.findOneAndUpdate(
      { owner: query.user_id },
      { $pull: { products: { _id: query.product_id } } },
    );

    return carts;
  }

  async updateProductInCart(
    updateDto: UpdateCartDTO,
    query: Query,
  ): Promise<Cart[]> {
    const carts = await this.cartModel.find({ owner: query.userId });

    if (carts.length != 0) {
      await this.cartModel.findOneAndUpdate(
        { owner: query.userId },
        { $set: { products: { product: updateDto } } },
        { arrayFilters: [{ _id: query.productId }] },
      );
    }

    return carts;
  }
}
