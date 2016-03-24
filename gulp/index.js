'use strict';

var config = require('./config');
if(config.writeFilesSimultaneously) {
  var isProduction = process.argv.length >= 3 && process.argv[2] == 'prod';
  if(isProduction) {
    config.paths.destEndpoint = config.paths.dest;
    config.paths.dest +=  '_' + (+new Date());
  }
}
if(!config.paths.destEndpoint) {
  config.paths.destEndpoint = config.paths.dest;
}

var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    runSequence = require('run-sequence');

global.isProduction = false;
global.isWatch = false;

fs.readdirSync(__dirname + '/tasks/')
  // tasks scripts
  .filter(function(name) {
    return /(\.(js)$)/i.test(path.extname(name));
  })
  // load
  .forEach(function(task) {
    require('./tasks/' + task);
  });

gulp.task('build-assets', function(cb) {
  runSequence(['images', 'fonts'], 'styles', ['templates', 'scripts-vendor'], cb)
})

gulp.task('default', ['clean-all'], function(cb) {
  runSequence('build-assets', 'scripts-watch', 'watch', 'server', cb)
});

