import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { CommentModule } from 'src/comment/comment.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { CommentSchema } from 'src/models/comment.schema';
import { CommentService } from 'src/comment/comment.service';
import { CommentSchema } from 'src/models/comment.schema';

@Module({
  imports: [
    // CommentModule,
    // AuthModule,
    // MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  providers: [SocketGateway],
})
export class SocketModule {}
