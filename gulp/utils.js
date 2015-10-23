'use strict';

var paths = require('./config').paths,
    pathUtil = require('path');

exports.path = path;
exports.error = error;

function path(p, full) {
  p = p.replace(/\{([^\}]+)\}/g, function(chunk, key){
    if(!(key in paths)) {
      console.warn('Warning: ' + key + ' does not exists in config.paths');
    }
    return paths[key] || key;
  })

  return full? pathUtil.normalize(__dirname + '/../' + p) : p;
}

function error (error) {
  console.log(error.toString());
  this.emit('end');
}
