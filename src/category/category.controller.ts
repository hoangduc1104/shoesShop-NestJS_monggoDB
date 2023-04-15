import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Category } from './schema/category.schema';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Category[]> {
    return this.categoryService.findAll(query);
  }
}
