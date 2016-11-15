var express = require('express');
var mysql = require('mysql');
var sessions = require('express-session');
var path = require('path');

var app = express();

app.use(sessions({
  secret : 'somesecret',
  resave : false,
  saveUninitialized : true,
  cookie : { secure : true }
}));

var db = require(path.join(__dirname, 'db', 'connect.js'));
require('./routeloader.js').init(app, 'routes', db);

app.listen(80);
