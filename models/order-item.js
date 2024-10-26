const Sequelize = require('sequelize');


const sequelize = require('../util/database');

const OrderItem = sequelize.define('OrderItem', {
      id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
      },
      quantity: Sequelize.INTEGER
});

module.exports = OrderItem;