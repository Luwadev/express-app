"use strict";

var express = require("express");

var path = require("path");

var app = express();

var adminRoute = require("./routes/admin");

var shopRoute = require("./routes/shop");

var page404 = require("./routes/404.js");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(express.urlencoded({
  extended: false
})); // app.use(bodyParser.urlencoded({extended: false}));

app.use(express["static"](path.join(__dirname, "public")));
app.use("/admin", adminRoute.route);
app.use(shopRoute);
app.use(page404);
app.listen(5000);