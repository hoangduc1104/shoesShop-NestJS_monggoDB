import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get('/:id')
  signUp(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
