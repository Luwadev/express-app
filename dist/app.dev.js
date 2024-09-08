"use strict";

var path = require('path');

var sequelize = require('./util/database');

var express = require('express');

var bodyParser = require('body-parser');

var errorController = require('./controllers/error');

var app = express(); // db.execute('SELECT * FROM products')
// .then(results => {
//       console.log(results);
// })
// .catch(err => {
//       console.log(err);
// })

var Product = require('./models/product');

var User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

var adminRoutes = require('./routes/admin');

var shopRoutes = require('./routes/shop'); // const sequelize = require('./util/database');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  User.findByPk(1).then(function (user) {
    req.user = user;
    next();
  })["catch"](function (err) {
    return console.log(err);
  });
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
app.get('/', function (req, res, next) {
  console.log(" Is everything working?");
  res.send("Helo world");
});
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});
User.hasMany(Product);
sequelize.sync().then(function (result) {
  console.log(result);
  return User.findByPk(1);
}).then(function (user) {
  if (!user) {
    return User.create({
      name: 'Ore',
      email: 'test@gmail.com'
    });
  }

  return user;
}).then(function (user) {
  console.log(user);
  app.listen(8000, function () {
    console.log("Server is running on port 8000");
  });
})["catch"](function (err) {
  return console.log(err);
});