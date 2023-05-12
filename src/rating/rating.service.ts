import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Rating } from 'src/types/rating';
import { createRatingDTO } from './dtos/createRating.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class RatingService {
  constructor(@InjectModel('Rating') private ratingModel: Model<Rating>) {}

  async listRatingByProduct(product_id: string) {
    const ratings = await this.ratingModel
      .find({ product: product_id })
      .populate('owner')
      .populate('product');

    if (!ratings) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }
    return ratings;
  }

  async createRating(query: Query, ratingDto: createRatingDTO) {
    const { rate, status, image } = ratingDto;
    const u_id = query.user_id.toString();
    const p_id = query.product_id.toString();

    const rating = await this.ratingModel.create({
      owner: new mongoose.Types.ObjectId(u_id),
      product: new mongoose.Types.ObjectId(p_id),
      rate,
      status,
      image,
    });

    // if (!ratings) {
    //   throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    // }
    return rating;
  }
}
