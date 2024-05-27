const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'})
};

exports.postAddProductPage = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    // res.send('<h1> Product Page <h1>');
    res.redirect('/');
};

exports.getHomePage = (req, res, next) => {
    const products = Product.fetchAll();
    console.log(products);
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'});
    // res.render('shop');
};