require('dotenv').config();

const express = require('express'),
      mongoose = require('mongoose'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      flash = require('connect-flash');

const routes = require('./routes');

mongoose.connect("mongodb://localhost:27017/test");

app.set("port", process.env.PORT || 3333);

app.set("views", path,join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitalized: true
}));
app.use(flash());

app.use(routes);

app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"));
});
