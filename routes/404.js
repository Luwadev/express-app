const express = require('express');

const path = require('path');

const route = express.Router();
const errorController = require('../controllers/error');

route.use(errorController.getErrorPage);


module.exports = route;