import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Detail {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  order_id: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  product_id: mongoose.Types.ObjectId;

  @Prop()
  quantity: number;

  @Prop()
  color: string;

  @Prop()
  size: string;
}

export const DetailSchema = SchemaFactory.createForClass(Detail);
