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

  router.get('/:id', function(req, res){
    var post_id = req.params.id;
    db.schema.posts.getPostById(db.conn, [post_id], function(success, result){
      return res.end({'success' :  success, 'result' : result});
    });
  });
  router.get('/getMostRecentPosts', function(req, res){
    var result = db.schema.posts.getMostRecentPosts(db.conn, [ req.session.username ], function(success, result){
      if(success === true){
        return res.end({'success' : true, 'result' : result});
      } else {
        return res.end({'success' : false, 'result' : result});
      }
    });
  });

  return router;
};
