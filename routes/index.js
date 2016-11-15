var Router = require('express').Router;
var crypto = require('crypto');

exports.init = function(db, model){
  var router = new Router();

  router.get('/', function(req, res){
    res.sendFile(path.join(__dirname + "/static/index.html"));
  });
  router.post('/login', function(req, res){
    var body = req.body;
    db.schema.users.loginUser(db.conn, {
      'username' : body.username, 'password' : (function(raw){
        var hash = crypto.createCipher('md5', body.username);
        hash.update(raw);
        return hash.digest().toString();
      })(body.password)
    }, function(err, rows, fields){
      if(err) return res.end({'success' : false, err});
      return res.end({'success' : true, 'result' : 'Logged Out'});
    });
  });
  router.post('/logout', function(req, res){
    if(req.session.isAuthenticated){
      req.session.isAuthenticated = false;
      req.session.user = "";
      return res.end({'success' : true, 'result' : 'Logged Out'});
    } else {
      return res.end({'success' : false,  'result' : 'Not Logged In'});
    }
  });

  return router;
};
