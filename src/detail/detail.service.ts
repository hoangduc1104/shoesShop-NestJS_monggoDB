import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Detail } from './schema/detail.schema';
import { Product } from 'src/product/schema/product.schema';

@Injectable()
export class DetailService {
  constructor(
    @InjectModel('Detail')
    private detailModel: mongoose.Model<Detail>,
  ) {}

  async listDetail(id: string): Promise<Detail[]> {
    const newId = new mongoose.Types.ObjectId(id);

    const orders = await this.detailModel.find({
      order_id: newId,
    });

    if (!orders) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }
    return orders;
  }
}
