var mysql = require('mysql');
var crypto = reqiure('crypto');

exports.init = function(db){
    db.schema.users = {};

    db.schema.users.registerUser = function(conn, data) {
        if (conn.session.isAuthenticated === true) {
            return [false, "Already logged in."];
        }
        var username = data.username;
        var password = data.password;
    };
    db.schema.users.loginUser = function(conn, data, cb) {
        if (data.session.isAuthenticated === true) return true;
        else {
            var user = data.username;
            var pass = data.password;
            return db.conn.query(db.scripts.auth_user, [user, pass], function(error, results, fields){
              if(err) return cb(false, err);
              if(results[fields[0]] === 1) return cb(true, 'Logged in as '+ user);
              else return cb(false, 'Failed');
            });
        }
    };
    db.schema.users.logoutUser = function(db, data) {
        data.session.isAuthenticated = false;
        data.session.username = "";
        return true;
    };
};
