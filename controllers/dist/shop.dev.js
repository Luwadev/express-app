"use strict";

var Product = require('../models/product');

var Cart = require('../models/cart');

var Order = require('../models/order');

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
  req.user.getCart().then(function (cart) {
    console.log(cart);
    return cart.getProducts().then(function (products) {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })["catch"](function (err) {
      return console.log(err);
    });
  })["catch"](function (err) {
    return console.log(err);
  }); // Cart.getCart(cart => {
  //       Product.fetchAll(products => {
  //             const cartProducts = [];
  //             for (let product of products){
  //                   const cartProductData = cart.products.find(prod => prod.id === product.id);
  //                   if (cartProductData) {
  //                         cartProducts.push({productData: product,qty: cartProductData.qty});
  //                   }
  //             }
  //             res.render('shop/cart', {
  //                   path: '/cart',
  //                   pageTitle: 'Your Cart',
  //                   products: cartProducts
  //             });
  //       })
  // })
};

exports.postCart = function (req, res, next) {
  var productId = req.body.productId;
  var fetchedCart;
  var newQuantity = 1;
  req.user.getCart().then(function (cart) {
    fetchedCart = cart;
    return cart.getProducts({
      where: {
        id: productId
      }
    });
  }).then(function (products) {
    var product;

    if (products.length > 0) {
      product = products[0];
    }

    if (product) {
      var oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return product;
    }

    return Product.findByPk(productId);
  }).then(function (product) {
    return fetchedCart.addProduct(product, {
      through: {
        quantity: newQuantity
      }
    });
  }).then(function () {
    res.redirect('/cart');
  })["catch"](function (err) {
    return console.log(err);
  }); // Product.findbyId(productId, (product) => {
  //       Cart.addProduct(productId, product.price);
  // });
  // console.log(productId);
};

exports.postDeleteItem = function (req, res, next) {
  var productId = req.body.productId;
  req.user.getCart().then(function (cart) {
    return cart.getProducts({
      where: {
        id: productId
      }
    });
  }).then(function (products) {
    var product = products[0];
    return product.cartItem.destroy();
  }).then(function () {
    res.redirect('/cart');
  })["catch"](function (err) {
    return console.log(err);
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

exports.postOrder = function (req, res, next) {
  var fetchedCart;
  req.user.getCart().then(function (cart) {
    fetchedCart = cart;
    return cart.getProducts();
  }).then(function (products) {
    return req.user.createOrder().then(function (order) {
      return order.addProducts(products.map(function (product) {
        product.orderItem = {
          quantity: product.cartItem.quantity
        };
        return product;
      }));
    });
    console.log(products);
  }).then(function (result) {
    return fetchedCart.setProducts(null);
  }).then(function (result) {
    res.redirect('/orders');
  })["catch"](function (err) {
    return console.log(err);
  });
};