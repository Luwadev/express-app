const express = require('express');
const path = require('path');

const route = express.Router();


route.get('/add-product',(req, res, next) => {
    // console.log('In another niddleware');
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});
route.post('/add-product',(req, res, next) => {
    console.log(req.body);
    // res.send('<h1> Product Page <h1>');
    res.redirect('/');
});

module.exports = route;