"use strict";

var Sequelize = require('sequelize');

var sequelize = require('../util/database');

var User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});
module.exports = User;