const express = require('express');
const path = require('path');

const route = express.Router();
const productsController = require('../controllers/products')

route.get('/', productsController.getHomePage);

module.exports = route;