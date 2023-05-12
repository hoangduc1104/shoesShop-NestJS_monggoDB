import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingSchema } from 'src/models/rating.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
  ],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
