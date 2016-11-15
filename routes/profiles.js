var Router = require('express').Router;
var crypto = require('crypto');

exports.init = function(db, model){
  var router = new Router();

  router.use(function(req, res, next){
    if(req.session.isAuthenticated !== true){
      return res.end({'success' : false, 'result' : 'Unauthenticated'});
    } else {
      next();
    }
  });

  router.get('/:username', function(req, res){
    var profile_username = req.params.id;
    db.schema.profiles.getPostById(db.conn, [profile_username], function(success, result){
      return res.end({'success' : success, 'result' : result});
    });
  });
  return router;
};
