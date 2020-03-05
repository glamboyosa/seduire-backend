const ProductType = require('./producttypes');
const Item = require('./item');
module.exports = {
  ...ProductType,
  ...Item
};
