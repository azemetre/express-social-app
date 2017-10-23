require('dotenv').config();

const express = require('express'),
      mongoose = require('mongoose'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      passport = require('passport'),
      session = require('express-session'),
      flash = require('connect-flash'),
      enforceSSL = require('express-enforces-ssl');

const setUpPassport = require('./setuppassport');
const routes = require('./routes');

const app = express();

mongoose.connect(process.env.MONGODB_ADDRESS);
setUpPassport();

app.set("port", process.env.PORT || 3333);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/static', express.static(path.join(__dirname, '/static')));

app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitalized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.enable("trust proxy");
app.use(enforceSSL());

app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"));
});
