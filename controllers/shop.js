const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
      Product.fetchAll(products => {
            res.render('shop/products', {
                  prods: products,
                  pageTitle: 'All Products',
                  path: '/products'
            });
      });
};

exports.getIndex = (req, res, next) => {
      Product.fetchAll(products => {
            res.render('shop/index', {
                  prods: products,
                  pageTitle: 'Shop',
                  path: '/'
            });
      });
};

exports.getProduct = (req, res, next) => {
      const productId = req.params.productId;
      Product.findbyId(productId, product => {
            res.render('shop/product-detail', {path: '/product', pageTitle: product.title, product: product})
      })
      // res.redirect('/');
}

exports.getCart = (req, res, next) => {
      Cart.getCart(cart => {
            Product.fetchAll(products => {
                  const cartProducts = [];
                  for (let product of products){
                        const cartProductData = cart.products.find(prod => prod.id === product.id);
                        if (cartProductData) {
                              cartProducts.push({productData: product,qty: cartProductData.qty});
                        }
                  }
                  res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        products: cartProducts
                  });
            })
      })
};  

exports.postCart = (req, res, next) => {
      const productId = req.body.productId;
      Product.findbyId(productId, (product) => {
            Cart.addProduct(productId, product.price);
      });
      // console.log(productId);
      res.redirect('/cart');
}
exports.postDeleteItem = (req, res, next) => {
      const productId = req.body.productId;
      Product.findbyId(productId, product => {
            Cart.deleteProduct(productId, product.price);
            res.redirect('/cart')
      })
}

exports.getOrders = (req, res, next) => {
      res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders'
      });
};

exports.getCheckout = (req, res, next) => {
      res.render('shop/checkout', {
            path: '/checkout',
            pageTitle: 'Checkout'
      });
};
