const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
      Product.findAll()
      .then(products => {
            res.render('shop/index', {
                  prods: products,
                  pageTitle: 'Products',
                  path: '/products'
            });
      })
      .catch(err => {
            console.log(err);
      })
};

exports.getIndex = (req, res, next) => {

      Product.findAll()
      .then(products => {
            res.render('shop/index', {
                  prods: products,
                  pageTitle: 'Shop',
                  path: '/'
            });
      })
      .catch(err => {
            console.log(err);
      })


      // syntax for database connection
      // Product.fetchAll().then(([rows, fieldsData]) => {
      //       // console.log(rows);
      //       res.render('shop/index', {
      //             prods: rows,
      //             pageTitle: 'Shop',
      //             path: '/'
      //       });

      // }).catch(err => console.log(err));

};

exports.getProduct = (req, res, next) => {
      const productId = req.params.productId;
      Product.findByPk(productId).then(
            (product) => {
            res.render('shop/product-detail',{
                  path: '/product', 
                  pageTitle: product.title,
                  product: product})
            }
      ).catch(err => console.log(err));
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
