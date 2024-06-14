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
  var description = req.body.description;
  var product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = function (req, res, next) {
  var editMode = req.query.edit;
  var productId = req.params.productId;
  Product.findbyId(productId, function (product) {
    if (!editMode) {
      return res.redirect('/');
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      product: product,
      editing: editMode
    });
  });
};

exports.getProducts = function (req, res, next) {
  Product.fetchAll(function (products) {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  });
};

exports.postEditProduct = function (req, res, next) {
  var productId = req.body.productId;
  var updatedTitle = req.body.title;
  var updatedImageUrl = req.body.imageUrl;
  var updatedPrice = req.body.price;
  var updatedDescription = req.body.description;
  var updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.postDeleteProduct = function (req, res, next) {
  var productId = req.body.productId;
  Product.deleteById(productId);
  res.redirect('/admin/products');
};