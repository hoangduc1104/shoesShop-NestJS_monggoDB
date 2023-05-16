import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Comment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: string;

  @Prop()
  rate: number;

  @Prop()
  status: string;

  @Prop()
  image: string;

  @Prop()
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
