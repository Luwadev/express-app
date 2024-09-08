"use strict";

var Product = require("../models/product");

exports.getAddProduct = function (req, res, next) {
  res.render("admin/edit-product", {
    pageTitle: " Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = function (req, res, next) {
  var title = req.body.title;
  var imageUrl = req.body.imageUrl;
  var price = req.body.price;
  var description = req.body.description; // const product = new Product(null, title, imageUrl, description, price);
  // product
  // .save()
  // .then(() => {
  //       res.redirect("/");
  // })
  // .catch(err => console.log(err));

  req.user.createProduct({
    price: price,
    title: title,
    imageUrl: imageUrl,
    description: description,
    userId: req.user.id
  }).then(function (result) {
    console.log(result);
    res.redirect('/admin/products');
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getEditProduct = function (req, res, next) {
  var editMode = req.query.edit;
  var productId = req.params.productId;
  req.user.getProducts({
    where: {
      id: productId
    }
  }).then(function (product) {
    if (!product) {
      return res.redirect('/');
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      product: product,
      editing: editMode
    });
  })["catch"](function (err) {
    return console.err;
  });
};

exports.getProducts = function (req, res, next) {
  Product.findAll().then(function (products) {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postEditProduct = function (req, res, next) {
  var productId = req.body.productId;
  var updatedTitle = req.body.title;
  var updatedImageUrl = req.body.imageUrl;
  var updatedPrice = req.body.price;
  var updatedDescription = req.body.description;
  Product.findByPk(productId).then(function (product) {
    product.title = updatedTitle;
    product.imageUrl = updatedImageUrl;
    product.price = updatedPrice;
    product.description = updatedDescription;
    return product.save();
  }).then(function (result) {
    console.log('Updated Product!');
    res.redirect('/admin/products');
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postDeleteProduct = function (req, res, next) {
  var productId = req.body.productId;
  Product.findByPk(productId).then(function (product) {
    return product.destroy();
  }).then(function (result) {
    console.log('Product deleted!');
    res.redirect('/admin/products');
  })["catch"](function (err) {
    return console.log(function (err) {
      return console.log(err);
    });
  });
};