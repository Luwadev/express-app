const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

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
      req.user.getCart().then(cart => {
            console.log(cart);
            return cart.getProducts().then(
                  products => {
                        res.render('shop/cart', {
                              path: '/cart',
                              pageTitle: 'Your Cart',
                              products: products
                        });
                  }
            ).catch(err => console.log(err));
      }).catch(err => console.log(err));

      // Cart.getCart(cart => {
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

exports.postCart = (req, res, next) => {
      const productId = req.body.productId;
      let fetchedCart;
      let newQuantity = 1;
      req.user.getCart().then(
            cart => {
                  fetchedCart = cart;
                  return cart.getProducts({where: {id: productId}});
            }
      ).then(
            products => {
                  let product;
                  if (products.length > 0) {
                        product = products[0];
                  }
                  if (product){
                        const oldQuantity = product.cartItem.quantity;
                        newQuantity = oldQuantity + 1;
                        return product;
                  }
                  return Product.findByPk(productId)
            }
      ).then(product => {
            return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
      }).then(() => {
                  res.redirect('/cart');

            }).catch(err => console.log(err));
      // Product.findbyId(productId, (product) => {
      //       Cart.addProduct(productId, product.price);
      // });
      // console.log(productId);
}
exports.postDeleteItem = (req, res, next) => {
      const productId = req.body.productId;
      req.user.getCart().then(cart => {
            return cart.getProducts({where: {id: productId}});
      }).then(products => {
            const product = products[0];
            return product.cartItem.destroy();
      }).then(() => {
            res.redirect('/cart')

      }).catch(err => console.log(err));

}

exports.getOrders = (req, res, next) => {
      req.user.getOrders().then(orders => {

            res.render('shop/orders', {
                  path: '/orders',
                  pageTitle: 'Your Orders',
                  orders: orders
            });
      }).catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
      res.render('shop/checkout', {
            path: '/checkout',
            pageTitle: 'Checkout'
      });
};

exports.postOrder = (req, res, next) => {
      let fetchedCart;
      req.user.getCart().then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
      }).then(products => {
            return req.user.createOrder().then(order => {
                  return order.addProducts(
                        products.map(product => {
                              product.orderItem = { quantity: product.cartItem.quantity };
                              return product;
                        })
                  )
            });
            console.log(products);
      }).then(result => {
            return fetchedCart.setProducts(null);
      }).then(result => {
            res.redirect('/orders');
      })
      .catch(err => console.log(err));
}