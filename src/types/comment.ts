import { Document } from 'mongoose';
import { Product } from 'src/product/schema/product.schema';
import { User } from 'src/user/schema/user.schema';

export interface Comment extends Document {
  owner: User;
  // totalPrice: number;
  product: Product;
  rate: number;
  status: string;
  image: string;
  created: Date;
}
