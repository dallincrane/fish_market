var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./config.json');

var app = express();

app.use(bodyParser.json());

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));

app.get('/cart', function (req, res, next) {
  res.json(req.session.cart);
});

app.post('/cart', function (req, res, next) {
  if (!req.session.cart) { req.session.cart = []; }
  req.session.cart.push(req.body);
  res.json(req.session.cart);
});

app.listen(config.port, function () {
  console.log('listening to port:', config.port);
});
