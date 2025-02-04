"use strict";

var Sequelize = require('sequelize');

var sequelize = require('../util/database');

var Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
});
module.exports = Cart;