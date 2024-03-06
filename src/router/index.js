const express = require('express');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const { isAdmin, isAuthenticated } = require('../middlewares')

// 버전1 라우터
const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/admin', isAdmin, adminRouter);
v1Router.use('/products', productRouter);
v1Router.use('/orders', isAuthenticated, orderRouter);

module.exports = {
  v1: v1Router, // API 버저닝
};
