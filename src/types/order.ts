import { Document, ObjectId } from 'mongoose';
import { User } from './user';
import { Product } from './product';

interface ProductOrder {
  product: Product;
  quantity: number;
  // size: string;
  // color: string;
}

export interface Order extends Document {
  user_id: ObjectId;
  totalPrice: number;
  products: ProductOrder[];
  // created: Date;
}
