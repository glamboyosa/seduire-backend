const User = require('../models/user');
const { item: Item } = require('../models/item');
const DateHelper = require('../helpers/date');
module.exports = {
  addToCart: async ({ item: itemId, size }) => {
    try {
      if (!itemId || itemId === '' || typeof itemId !== 'string') {
        throw new Error('Invalid item format');
      }
      const item = Item.findById(itemId);
      if (!item) {
        throw new Error('Could not find any item matching that ID');
      }
      // hardcode user for now, pass it in with the request object subsequently
      // ensure to write if check for req
      const user = User.findById('5e6392f32206b910bc87fdc1');
      if (!user) {
        throw new Error('user does not exist');
      }
      user.cart.push(item);
      return {
        ...item._doc,
        _id: item.id,
        createdAt: DateHelper(item._doc.createdAt),
        updatedAt: DateHelper(item._doc.updatedAt)
      };
    } catch (error) {
      throw new Error(`Error message: ${error.message}`);
    }
  },
  getCart: async () => {
    const user = User.findById('5e6392f32206b910bc87fdc1');
    if (!user) {
      throw new Error('User with the given ID does not exist');
    }
    return user.cart.map(cartItem => {
      return {
        ...cartItem._doc,
        createdAt: DateHelper(cartItem._doc.createdAt),
        updatedAt: DateHelper(cartItem._doc.updatedAt)
      };
    });
  }
};