import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get('/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Get('/phone/:phone')
  async findByPhoneNumber(@Param('phone') phone: string): Promise<User> {
    return this.userService.findByPhonenumber(phone);
  }
}
