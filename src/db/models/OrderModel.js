const { model } = require('mongoose');
const { OrderSchema } = require('../schemas');
const mongoose = require('mongoose');

const Order = model('orders', OrderSchema);

class OrderModel {
  // userid에 대하여 자기가 주문한 내역을 가져온다.
  async findByUserId(userId) {
    return await Order.find({ userId }).lean();
  }

  // 주문 정보를 변경한다. (배송주소, 배송자명 등)
  async updateOrder(id, { address, receiver, receiverPhone }) {
    return await Order.updateOne({ "_id": id }, { $set: { address, receiver, receiverPhone } });
  }

  // 주문 상태를 변경한다. (관리자, 사용자 = status: "paid")
  async updateStatus(id, status) {
    return await Order.updateOne({ "_id": id }, { $set: status });
  }

  // 주문 정보를 저장한다.
  async createOrder(orderInfo) {
    return (await Order.create(orderInfo)).toObject();
  }

  // 주문 내역을 전체 조회한다. (관리자)
  async findOrders() {
    return await Order.find({}).sort({ "createdAt": -1 }).lean();
  }
  // 주문 내역을 전체 조회한다. (사용자)
  async findOrdersByUserId(userId) {
    return await Order.find({ userId }).sort({ "createdAt": -1 }).lean();
  }

  // 특정 사용자의 주문 내역을 조회한다. (관리자)
  async findOrderByUserId(id) {
    return await Order.find({ userId: id }).sort({ "createdAt": -1 }).lean();
  }

  // 특정 주문에 대한 내역을 조회한다. (사용자)
  async findOrderById(userId, id) {
    return await Order.find({ userId, _id: id }).sort({ "createdAt": -1 }).lean();
  }

  async deleteOrder(id) {
    return await Order.deleteOne({ id });
  }

  async findOrderByOrderId(id) {
    return await Order.findOne({ id });
  }
}

module.exports = new OrderModel();
