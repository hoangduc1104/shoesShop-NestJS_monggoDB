import {
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Body,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { Cart } from 'src/types/cart';
import { AddToCartDTO } from './dtos/addToCart.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { UpdateCartDTO } from './dtos/updateProductInCart';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':id')
  @UseGuards(AuthGuard())
  async listOrders(@Param('id') id: string): Promise<Cart[]> {
    try {
      return this.cartService.listCartsByUser(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post(':id')
  @UseGuards(AuthGuard())
  async addToCart(
    @Body() addDto: AddToCartDTO,
    @Param('id') id: string,
  ): Promise<Cart[]> {
    try {
      return this.cartService.addToCart(addDto, id);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete()
  @UseGuards(AuthGuard())
  async DeleteProductInCart(@Query() query: ExpressQuery): Promise<Cart[]> {
    try {
      return this.cartService.deleteProductInCart(query);
    } catch (error) {
      console.log(error);
    }
  }
  @Put()
  @UseGuards(AuthGuard())
  async UpdateProductInCart(
    @Body() updateDto: UpdateCartDTO,
    @Query() query: ExpressQuery,
  ): Promise<Cart[]> {
    try {
      return this.cartService.updateProductInCart(updateDto, query);
    } catch (error) {
      console.log(error);
    }
  }
}
