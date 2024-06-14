"use strict";

var Product = require('../models/product');

exports.getProducts = function (req, res, next) {
  Product.fetchAll(function (products) {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products',
      path: '/products'
    });
  }); // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
  // res.render('shop');
};

exports.getAboutPage = function (req, res, next) {
  res.render('about', {
    path: '/admin/about',
    pageTitle: 'About'
  });
};

exports.getCartPage = function (req, res, next) {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrdersPage = function (req, res, next) {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getIndexPage = function (req, res, next) {
  // res.render('shop/products', {path: '/products', pageTitle: 'Products Page'});
  Product.fetchAll(function (products) {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getProductDetailPage = function (req, res, next) {
  // res.render('shop/product-list', {path: '/product-detail', pageTitle: 'Product Detail'});
  Product.fetchAll(function (products) {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Products',
      path: '/products'
    });
  });
};