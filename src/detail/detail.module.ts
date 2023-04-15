import { Module } from '@nestjs/common';
import { DetailController } from './detail.controller';
import { DetailService } from './detail.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DetailSchema } from './schema/detail.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Detail', schema: DetailSchema }]),
  ],
  controllers: [DetailController],
  providers: [DetailService],
})
export class DetailModule {}
