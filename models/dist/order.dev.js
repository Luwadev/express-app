"use strict";

var Sequelize = require('sequelize');

var sequelize = require('../util/database');

var Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
});
module.exports = Order;