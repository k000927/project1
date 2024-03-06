const { model } = require('mongoose');
const { ProductSchema } = require('../schemas');

const Product = model('products', ProductSchema);

class ProductModel {
  async create(product) {
    return (await Product.create(product)).toObject();
  }
  async find() {
    return await Product.find().lean();
  }
  async findOne(productId) {
    return await Product.findOne({ id: productId }).lean();
  }
  async findByCategoryId(categoryId) {
    return await Product.find({ categoryId }).lean();
  }
  async updateOne(product) {
    return await Product.updateOne(product);
  }
  async deleteOne(productId) {
    return await Product.deleteOne({ id: productId });
  }
  async findSix() {
    return (await Product.find().sort({ "createdAt": -1 })).slice(0, 6);
  }
  async findSixByCategoryId(categoryId) {
    return (await Product.find({ categoryId }).sort({ "createdAt": -1 })).slice(0, 6);
  }
  async findSixCoffee() {
    return (await Product.find({ categoryId: { $ne: 'supplies' } }).sort({ "createdAt": -1 })).slice(0, 6);
  }
}

module.exports = new ProductModel();
