const path = require('path');
const sequelize = require('./util/database');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();
// db.execute('SELECT * FROM products')
// .then(results => {
//       console.log(results);
// })
// .catch(err => {
//       console.log(err);
// })

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const Order = require('./models/order');
const CartItem = require('./models/cart-item');
const OrderItem = require('./models/order-item');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const sequelize = require('./util/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
      User.findByPk(1).then(
            user => {
                  req.user = user;
                  next();
            }
      ).catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.get('/', (req, res, next) => {
      console.log(" Is everything working?");
      res.send("Helo world");
})

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});



sequelize.sync()
.then(
      result => {
            console.log(result);
            return User.findByPk(1);
 }).then(user => {
      if (!user) {
            return User.create({name: 'Ore', email:'test@gmail.com'})
      }
      return user;
 }).then(user => {
      // console.log(user);
      user.createCart();
 }).then(cart => {
      app.listen(8000, () => {
      console.log("Server is running on port 8000")})

 })
.catch(err => console.log(err));


