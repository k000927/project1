const { productModel } = require('../db/models');

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }
  // 특정 id를 갖는 하나의 게시글을 가져오는 메소드
  async getProduct(id) {
    const product = await this.productModel.findOne(id);
    return product;
  }
  // 특정 조건(title과 author)에 맞는 여러 개의 게시글을 가져오는 메소드
  async getProducts() {
    const products = await this.productModel.find();
    return products;
  }
  // 특정 카테고리에 맞는 여러 개의 게시글을 가져오는 메소드
  async getProductsByCategoryId(categoryId) {
    const products = await this.productModel.findByCategoryId(categoryId);
    return products;
  }
  // 상품 6개 리턴
  async getSixProducts() {
    const products = await this.productModel.findSix();
    return products;
  }

  async getCategoryProducts(categoryId) {
    const products = await this.productModel.findSixByCategoryId(categoryId);
    return products;
  }

  async getSixCoffees() {
    const products = await this.productModel.findSixCoffee();
    return products;
  }
}

module.exports = new ProductService(productModel);
