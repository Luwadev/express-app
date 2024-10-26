"use strict";

var Sequelize = require('sequelize');

var sequelize = require('../util/database');

var CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: Sequelize.INTEGER
});
module.exports = CartItem;