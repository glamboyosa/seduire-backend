const User = require('../models/user');
const { item: Item } = require('../models/item');
const DateHelper = require('../helpers/date');
module.exports = {
  addToCart: async ({ item: itemId, size }, req) => {
    try {
      if (!req.userId) {
        throw new Error('User does not exist.');
      }
      if (!itemId || itemId === '' || typeof itemId !== 'string') {
        throw new Error('Invalid item format');
      }
      const item = await Item.findById(itemId);
      if (!item) {
        throw new Error('Could not find any item matching that ID');
      }
      // hardcode user for now, pass it in with the request object subsequently
      // ensure to write if check for req
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error('user does not exist');
      }

      user.cart.push({
        ...item._doc,
        _id: item.id,
        createdAt: DateHelper(item._doc.createdAt),
        updatedAt: DateHelper(item._doc.updatedAt),
        size: [size]
      });
      await user.save();
      return {
        ...item._doc,
        _id: item.id,
        createdAt: DateHelper(item._doc.createdAt),
        updatedAt: DateHelper(item._doc.updatedAt),
        size: [size]
      };
    } catch (error) {
      throw new Error(`Error message: ${error.message}`);
    }
  },
  getCart: async (args, req) => {
    try {
      if (!req.userId) {
        throw new Error('User is not logged in.');
      }
      const user = await User.findById(req.userId);
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
    } catch (error) {
      throw new Error(`Error message: ${error.message}`);
    }
  },
  removeFromCart: async ({ item: itemId }, req) => {
    try {
      if (!req.userId) {
        throw new Error('User is not logged in');
      }
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error('User with the given ID does not exist');
      }
      oldCart = user.cart.filter(el => el.id === itemId)[0];
      user.cart = user.cart.filter(el => el.id !== itemId);
      await user.save();
      return {
        ...oldCart._doc,
        createdAt: DateHelper(oldCart._doc.createdAt),
        updatedAt: DateHelper(oldCart._doc.updatedAt)
      };
    } catch (error) {
      throw new Error(`Error message: ${error.message}`);
    }
  }
};
