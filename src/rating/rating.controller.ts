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
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { RatingService } from './rating.service';
import { Rating } from 'src/types/rating';
import { createRatingDTO } from './dtos/createRating.dto';

@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Get(':product_id')
  async listOrders(@Param('product_id') id: string): Promise<Rating[]> {
    try {
      return this.ratingService.listRatingByProduct(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  async addToCart(
    @Body() createDto: createRatingDTO,
    @Query() query: ExpressQuery,
  ): Promise<Rating> {
    try {
      return this.ratingService.createRating(query, createDto);
    } catch (error) {
      console.log(error);
    }
  }
}
