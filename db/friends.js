var mysql = require('mysql');
var crypto = reqiure('crypto');

exports.init = function(db){
  db.schema.friends.addFriend = function(conn, params, cb){
    return conn.query(db.scripts.add_friend, params, function(err, rows, fields){
      if(err) return cb(false, err);
      return cb(true, rows);
    });
  };
  db.schema.friends.removeFriend = function(conn, params, cb){
    return conn.query(db.scripts.remove_friend, params, function(err, rows, fields){
      if(err) return cb(false, err);
      return cb(true, rows);
    });
  };
  db.schema.friends.getFriendsList = function(conn, params, cb){
    return conn.query(db.scripts.get_friends_list, params, function(err, rows, fields){
      if(err) return cb(false, err);
      return cb(true, rows);
    });
  }
};
