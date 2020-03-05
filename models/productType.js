const { Schema, model } = require('mongoose');
const schema = new Schema({
  productType: {
    type: String,
    required: true,
    min: 5,
    max: 10
  }
});
const productTypeModel = model('ProductType', schema);
exports.ProductTypeSchema = schema;
exports.ProductTypeModel = productTypeModel;
