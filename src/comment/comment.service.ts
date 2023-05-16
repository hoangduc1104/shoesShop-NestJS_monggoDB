import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';
import { createCommentDTO } from './dtos/createComment.dto';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(@InjectModel('Comment') private commentModel: Model<Comment>) {}

  async listCommentByProduct(product_id: string) {
    const comments = await this.commentModel
      .find({ product: product_id })
      .populate('owner')
      .populate('product');

    if (!comments) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }
    return comments;
  }

  async createComment(query: Query, commentDto: createCommentDTO) {
    const { rate, status, image } = commentDto;
    const u_id = query.user_id.toString();
    const p_id = query.product_id.toString();

    const comment = await this.commentModel.create({
      owner: new mongoose.Types.ObjectId(u_id),
      product: new mongoose.Types.ObjectId(p_id),
      rate,
      status,
      image,
    });

    // if (!ratings) {
    //   throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    // }
    return comment.save();
  }
}
