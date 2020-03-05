const { ProductTypeModel: ProductType } = require('../models/productType');
module.exports = {
  getProductType: async () => {
    try {
      const productType = await ProductType.find();
      return productType;
    } catch (error) {
      throw new Error(`Error message: ${error.message}`);
    }
  },
  createProductType: async ({ productType }) => {
    try {
      const TypeOfProduct = new ProductType({
        productType
      });
      await TypeOfProduct.save();
      return TypeOfProduct;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
};
