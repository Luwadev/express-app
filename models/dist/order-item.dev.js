"use strict";

var Sequelize = require('sequelize');

var sequelize = require('../util/database');

var OrderItem = sequelize.define('OrderItem', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: Sequelize.INTEGER
});
module.exports = OrderItem;