var express = require('express');
var mysql = require('mysql');

var app = express();

app.use(sessions({

}));

var db = require(path.join(__dirname, 'db', 'connect.js'));
require('./routeloader.js').init(app, 'routes', db);

app.listen(80);
