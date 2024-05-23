const express = require('express');
const path = require('path');

const route = express.Router();
const adminData = require('./admin');

route.get('/',(req, res, next) => {
    console.log(adminData.products);
    const products = adminData.products
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    res.render('shop', {prods: products, docTitle: 'Shop'});
    // res.render('shop');
});

module.exports = route;