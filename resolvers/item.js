const { item } = require('../models/item');
const { ProductTypeModel } = require('../models/productType');
module.exports = {
  getProducts: async () => {
    try {
      const Item = await item.find();
      return Item.map(item => {
        return {
          ...item._doc,
          _id: item.id,
          createdAt: new Date(item._doc.createdAt).toISOString(),
          updatedAt: new Date(item.updatedAt).toISOString()
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
        createdAt: new Date(item._doc.createdAt).toISOString(),
        updatedAt: new Date(item.updatedAt).toISOString()
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
      console.log(ProductType);
      if (!ProductType) {
        throw new Error('No product with this type exists');
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
      console.log(result);
      return {
        ...result._doc,
        _id: result.id,
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.updatedAt).toISOString()
      };
    } catch (error) {
      throw new Error(`Error message: ${error.message}`);
    }
  }
};
