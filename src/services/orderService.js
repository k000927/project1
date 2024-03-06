const { orderModel } = require('../db/models');

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 주문 내역 전체 조회 사용자
  async getOrders(userId) {
    const orders = await this.orderModel.findOrdersByUserId(userId);
    return orders;
  }

  // 주문 내역 특정 내역 조회 사용자
  async getOrder(userId, id) {
    const order = await this.orderModel.findOrderById(userId, id);
    return order;
  }

  // 주문 내역 변경 사용자
  async putOrder(orderId, { address, receiver, receiverPhone }) {
    return await this.orderModel.updateOrder(orderId, { address, receiver, receiverPhone });
  }

  // 주문 내역 주문상태 변경 사용자
  async putStatus(id, status) {
    const result = await this.orderModel.updateStatus(id, status);
    return result;
  }

  async postOrder(orderInfo) {
    return await this.orderModel.createOrder(orderInfo);
  }
}

module.exports = new OrderService(orderModel);
