import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { DetailModule } from './detail/detail.module';
import { CartModule } from './cart/cart.module';
import { HistoryModule } from './history/history.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    DetailModule,
    CartModule,
    HistoryModule,
    RatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
