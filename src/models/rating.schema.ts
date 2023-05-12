import * as mongoose from 'mongoose';

export const RatingSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },

  rate: Number,

  status: String,

  image: String,

  created: {
    type: Date,
    default: Date.now,
  },
});
