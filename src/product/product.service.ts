import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}

  async findAll(query: Query): Promise<Product[]> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const category = query.category_id
      ? {
          category_id: new mongoose.Types.ObjectId(
            query.category_id.toString(),
          ),
        }
      : {};
    const max = query.max
      ? {
          price: { $lte: query.max },
        }
      : {};
    const min = query.min
      ? {
          price: { $gte: query.min },
        }
      : {};

    const products = await this.productModel
      .find({ ...keyword })
      .find({ ...category })
      .find({ ...max })
      .find({ ...min })
      .limit(resPerPage)
      .skip(skip);
    return products;
  }

  async findById(id: string): Promise<Product> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }
}
