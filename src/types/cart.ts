import { Document } from 'mongoose';
import { Product } from 'src/product/schema/product.schema';
import { User } from 'src/user/schema/user.schema';

interface ProductOrder {
  product: Product;
  quantity: number;
  color: string;
  size: string;
}

export interface Cart extends Document {
  owner: User;
  // totalPrice: number;
  products: ProductOrder[];
  created: Date;
}
