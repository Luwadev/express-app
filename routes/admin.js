const express = require('express');
const path = require('path');

const route = express.Router();
const productsController = require('../controllers/products')

route.get('/add-product', productsController.getAddProductPage);

route.post('/add-product', productsController.postAddProductPage);

// module.exports = route;
exports.route = route;
