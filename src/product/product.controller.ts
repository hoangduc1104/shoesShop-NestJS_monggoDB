import { Controller, Get, Post, Query, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Product } from './schema/product.schema';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(@Query() query: ExpressQuery): Promise<Product[]> {
    return this.productService.findAll(query);
  }

  @Get(':id')
  async getProduct(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productService.findById(id);
  }
}
