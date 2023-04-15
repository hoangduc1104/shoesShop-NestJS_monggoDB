import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user_id: mongoose.Types.ObjectId;

  @Prop()
  status: number;

  //   created: {
  //     type: Date,
  //     default: Date.now,
  //   };
}

export const OrderSchema = SchemaFactory.createForClass(Order);
