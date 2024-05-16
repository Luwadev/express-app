const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const page404 = require('./routes/404.js')

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoute);
app.use(shopRoute);

app.use(page404);

app.listen(3000);