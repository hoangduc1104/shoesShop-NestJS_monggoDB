import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './schema/user.schema';
import { Query } from 'express-serve-static-core';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { promises } from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return false;
      // throw new NotFoundException('User not found.');
    }

    return true;
  }

  async findByEmailUser(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return null;
      // throw new NotFoundException('User not found.');
    }

    return user;
  }

  async findByPhonenumber(phone: string) {
    const user = await this.userModel.findOne({ phone: phone });
    if (!user) {
      return false;
    }

    return true;
  }

  async findAll(query: Query): Promise<User[]> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          username: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const users = await this.userModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return users;
  }

  async uploadAvatar(image: string, userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (user) {
      const a = await this.userModel.findByIdAndUpdate(userId, {
        $set: { image: image },
      });
    }

    return user;
  }
}
