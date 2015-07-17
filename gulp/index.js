var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path');
    runSequence = require('run-sequence');

global.isProduction = false;

fs.readdirSync(__dirname + '/tasks/')
  // tasks scripts
  .filter(function(name) {
    return /(\.(js)$)/i.test(path.extname(name));
  })
  // load
  .forEach(function(task) {
    require('./tasks/' + task);
  });

gulp.task('build-assets', ['styles', 'images', 'fonts', 'templates'])
gulp.task('build', ['scripts', 'build-assets'])

gulp.task('default', ['clean'], function() {
  runSequence('build-assets', 'scripts-watch', 'watch', 'server')
});

gulp.task('prod', ['clean'], function() {
  global.isProduction = true;
  runSequence('build-assets', 'scripts')
});

// TODO minify/prod task
