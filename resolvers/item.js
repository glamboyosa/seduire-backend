const { item } = require('../models/item');
const { ProductTypeModel } = require('../models/productType');
const DateHelper = require('../helpers/date');
module.exports = {
  getProducts: async () => {
    try {
      const Item = await item.find();
      return Item.map(item => {
        return {
          ...item._doc,
          _id: item.id,
          createdAt: DateHelper(item._doc.createdAt),
          updatedAt: DateHelper(item.updatedAt)
        };
      });
    } catch (error) {
      throw new Error(`error message: ${error.message}`);
    }
  },
  getProduct: async ({ productId }) => {
    try {
      const Item = await item.findById(productId);
      if (!Item) {
        throw new Error('Product does not exist');
      }
      return {
        ...Item._doc,
        _id: item.id,
        createdAt: DateHelper(item._doc.createdAt),
        updatedAt: DateHelper(item.updatedAt)
      };
    } catch (error) {
      throw new Error(`Error message: ${error.message}`);
    }
  },
  createProduct: async ({ productInput }) => {
    try {
      const {
        description,
        creator,
        type,
        size,
        price,
        mediaUrl,
        sex
      } = productInput;
      const ProductType = await ProductTypeModel.findById(type);
      if (!ProductType) {
        throw new Error('No product with this type exists');
      }
      if (
        !description ||
        description === '' ||
        typeof description !== 'string'
      ) {
        throw new Error('Invalid description format');
      }
      if (!creator || creator === '' || typeof creator !== 'string') {
        throw new Error('Invalid creator format');
      }
      if (!sex || sex === '' || typeof sex !== 'string') {
        throw new Error('Invalid sex format');
      }
      if (!price || price === '' || typeof price !== 'number') {
        throw new Error('Invalid price format');
      }
      if (!size || size.length === 0) {
        throw new Error('Invalid size format');
      }
      if (!mediaUrl || mediaUrl === '' || typeof mediaUrl !== 'string') {
        throw new Error('Invalid mediaUrl format');
      }
      const items = new item({
        description,
        creator,
        type: {
          _id: ProductType._id,
          productType: ProductType.productType
        },
        sex,
        price,
        mediaUrl,
        count: 1
      });
      items.size.push(...size);
      const result = await items.save();
      return {
        ...result._doc,
        _id: result.id,
        createdAt: DateHelper(result._doc.createdAt),
        updatedAt: DateHelper(result._doc.updatedAt)
      };
    } catch (error) {
      throw new Error(`Error message: ${error.message}`);
    }
  },
  getCategory: async ({ sex }) => {
    try {
      const Item = await item.find({ sex });
      if (!Item) {
        throw new Error('There are currently no categories');
      }
      return Item.map(category => {
        return {
          ...category._doc,
          _id: category.id,
          createdAt: DateHelper(category._doc.createdAt),
          updatedAt: DateHelper(category._doc.updatedAt)
        };
      });
    } catch (error) {
      throw new Error(`Error message: ${error.message}`);
    }
  }
};
