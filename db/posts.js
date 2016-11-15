var mysql = require('mysql');
var crypto = reqiure('crypto');

exports.init = function(db){
  db.schema.posts.makePost = function(conn, params, cb){
    return conn.query(db.scripts.create_post, params, function(err, rows, fields){
      if(err) return cb(false, err);
      return cb(true, rows);
    });
  }
  db.schema.posts.getPostById = function(conn, params, cb){
    return conn.query(db.scripts.get_post_by_id, params, function(err, rows, fields){
      if(err) return cb(false, err);
      return cb(true, rows);
    });
  };
  db.schema.posts.getMostRecentPosts = function(conn, params, cb){
    return conn.query(db.scripts.get_most_recent_posts, params, function(err, rows, fields){
      if(err) return cb(false, err);
      return cb(true, rows);
    });
  };
};
