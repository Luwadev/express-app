"use strict";

var Product = require('../models/product');

var Cart = require('../models/cart');

exports.getProducts = function (req, res, next) {
  Product.findAll().then(function (products) {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Products',
      path: '/products'
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getIndex = function (req, res, next) {
  Product.findAll().then(function (products) {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })["catch"](function (err) {
    console.log(err);
  }); // syntax for database connection
  // Product.fetchAll().then(([rows, fieldsData]) => {
  //       // console.log(rows);
  //       res.render('shop/index', {
  //             prods: rows,
  //             pageTitle: 'Shop',
  //             path: '/'
  //       });
  // }).catch(err => console.log(err));
};

exports.getProduct = function (req, res, next) {
  var productId = req.params.productId;
  Product.findByPk(productId).then(function (product) {
    res.render('shop/product-detail', {
      path: '/product',
      pageTitle: product.title,
      product: product
    });
  })["catch"](function (err) {
    return console.log(err);
  }); // res.redirect('/');
};

exports.getCart = function (req, res, next) {
  Cart.getCart(function (cart) {
    Product.fetchAll(function (products) {
      var cartProducts = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var product = _step.value;
          var cartProductData = cart.products.find(function (prod) {
            return prod.id === product.id;
          });

          if (cartProductData) {
            cartProducts.push({
              productData: product,
              qty: cartProductData.qty
            });
          }
        };

        for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = function (req, res, next) {
  var productId = req.body.productId;
  Product.findbyId(productId, function (product) {
    Cart.addProduct(productId, product.price);
  }); // console.log(productId);

  res.redirect('/cart');
};

exports.postDeleteItem = function (req, res, next) {
  var productId = req.body.productId;
  Product.findbyId(productId, function (product) {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = function (req, res, next) {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = function (req, res, next) {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};