import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  readonly password: string;
  email: string;
  phone: number;
  address: string;
  image: string;
  // created: Date;
}
