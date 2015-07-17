
var paths = require('./config').paths,
    pathUtil = require('path');

exports.path = path;
exports.error = error;

function path(p, full) {
  p = p.split('/').map(function(i) {
    return paths[i] || i;
  }).join('/')
  return full? pathUtil.normalize(__dirname + '/../' + p) : p;
}

function error (error) {
  console.log(error.toString());
  this.emit('end');
}
