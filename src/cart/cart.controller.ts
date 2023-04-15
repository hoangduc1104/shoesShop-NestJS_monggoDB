import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { Cart } from 'src/types/cart';

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
}
