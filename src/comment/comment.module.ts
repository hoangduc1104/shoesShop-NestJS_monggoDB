import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { SocketGateway } from 'src/socket/socket.gateway';
// import { CommentSchema } from 'src/models/comment.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService, SocketGateway],
})
export class CommentModule {}
