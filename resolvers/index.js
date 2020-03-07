const ProductType = require('./producttypes');
const Item = require('./item');
const User = require('./auth');
const Cart = require('./cart');
module.exports = {
  ...ProductType,
  ...Item,
  ...User,
  ...Cart
};
