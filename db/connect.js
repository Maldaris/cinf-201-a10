var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var config = JSON.parse(fs.readLinesSync(path.join(__dirname, 'db', 'config.json')));

exports.init = function(){
  var db = {};
  db.conn = mysql.createPool({
    host : 'localhost',
    user : config.username,
    password : config.password,
    database : config.database
  });
  db.schema = {};
  var files = fs.readdirSync(path.join(__dirname, 'db'));
  for (var x = 0; x < files.length; x++) {
    if (path.extname(files[x]) === '.js' && path.basename(files[x]) !== 'connect') {
        db.schema[path.basename(files[x])] = require(files[x]);
    }
  }
  db.scripts = {};
  files = fs.readdirSync(path.join(__dirname,'db','scripts'));
  for (var x = 0; x < files.length; x++) {
    if (path.extname(files[x]) === '.sql') {
      db.scripts[path.basename(files[x])] = fs.readLinesSync(path.join(__dirname, 'db','scripts', files[x])).toString();
    }
  }
};
