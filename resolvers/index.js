const ProductType = require('./producttypes');
const Item = require('./item');
const User = require('./auth');
const Cart = require('./cart');
const TrxHandler = require('./transaction-handler');
module.exports = {
  ...ProductType,
  ...Item,
  ...User,
  ...Cart,
  ...TrxHandler
};
