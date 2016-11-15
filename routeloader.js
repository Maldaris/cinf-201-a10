var fs = require('fs');
var path = require('path');
exports.init = function(app, routePrefix, db) {
  var files = fs.readdirSync(path.join(__dirname, routePrefix)).filter(function(element) {
    if (path.extname(element) === '.js') return true;
    return false;
  });
  for(var x = 0; x < files.length; x++){
    var routePath = path.basename(files[x], '.js');
    app.use(routePath, require(path.join(__dirname, routePrefix, files[x])).init(db));
  }
};
