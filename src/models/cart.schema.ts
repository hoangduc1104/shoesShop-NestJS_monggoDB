import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
      },
      color: {
        type: String,
      },
      size: {
        type: String,
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});
