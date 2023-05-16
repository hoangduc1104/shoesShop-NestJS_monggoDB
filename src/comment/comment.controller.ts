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
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';
// import { Comment } from 'src/types/comment';
import { createCommentDTO } from './dtos/createComment.dto';
import { Comment } from './schemas/comment.schema';
import { SocketGateway } from 'src/socket/socket.gateway';
import { log } from 'console';
// import { CommentGateway } from './comment.gateway'; // Thêm dòng này

@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private commentGateway: SocketGateway,
  ) {}

  @Get(':product_id')
  async listComment(@Param('product_id') id: string): Promise<Comment[]> {
    try {
      return this.commentService.listCommentByProduct(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  async addComment(
    @Body() createDto: createCommentDTO,
    @Query() query: ExpressQuery,
  ): Promise<Comment> {
    try {
      const comment = this.commentService.createComment(query, createDto);

      this.commentGateway.handleComment(null, { ...query, ...createDto });

      return comment;
    } catch (error) {
      console.log(error);
    }
  }
}
