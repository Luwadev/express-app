const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Products', path: '/products'});
    });
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    // res.render('shop');
};

exports.getAboutPage = (req, res, next) => {
    res.render('about', {path: '/admin/about', pageTitle: 'About'});
}


exports.getCartPage = (req, res, next) => {
    res.render('shop/cart', {path: '/cart', pageTitle: 'Your Cart'});
}


exports.getOrdersPage = (req, res, next) => {
    res.render('shop/orders', {path: '/orders', pageTitle: 'Your Orders'});

}

exports.getIndexPage = (req, res, next) => {
    // res.render('shop/products', {path: '/products', pageTitle: 'Products Page'});
    Product.fetchAll((products) => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop', path: '/'});
    });
}

exports.getProductDetailPage = (req, res, next) => {
    // res.render('shop/product-list', {path: '/product-detail', pageTitle: 'Product Detail'});
    Product.fetchAll((products) => {
        res.render('shop/index', {prods: products, pageTitle: 'Products', path: '/products'});
    });
}