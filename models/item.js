const { Schema, model } = require('mongoose');
const { ProductTypeSchema } = require('./productType');
const schema = new Schema(
  {
    description: {
      type: String,
      required: true,
      min: 3,
      max: 256
    },
    creator: {
      type: String,
      required: true,
      min: 3,
      max: 256
    },
    type: {
      type: ProductTypeSchema,
      required: true
    },
    sex: {
      type: String,
      required: true
    },
    size: [
      {
        type: String,
        min: 4,
        max: 20,
        required: true
      }
    ],
    price: {
      type: Number,
      required: true
    },
    mediaUrl: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
const itemModel = model('Item', schema);
exports.item = itemModel;
exports.cart = schema;
