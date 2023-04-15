import { Document } from 'mongoose';

import { User } from './user';

export interface Product extends Document {
  owner: User;
  name: string;
  description: string;
  avatar: string;
  images: string[];
  size: string[];
  color: string[];
  price: number;
  // created: Date;
}
