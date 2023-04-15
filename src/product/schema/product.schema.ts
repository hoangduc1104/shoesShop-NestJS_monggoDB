import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  avatar: string;

  @Prop()
  images: string[];

  @Prop()
  size: number[];

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  category_id: ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
