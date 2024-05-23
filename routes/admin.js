const express = require('express');
const path = require('path');

const route = express.Router();

const products = [];

route.get('/add-product',(req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product'})
});
route.post('/add-product',(req, res, next) => {
    console.log(req.body);
    products.push({title: req.body.title})
    // res.send('<h1> Product Page <h1>');
    res.redirect('/');
});

// module.exports = route;
exports.route = route;
exports.products = products;