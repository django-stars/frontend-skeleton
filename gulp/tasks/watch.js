'use strict';

var gulp = require('gulp'),
    path = require('../utils').path,
    livereload = require('gulp-livereload'),
    ports = require('../config').ports;

gulp.task('watch', function() {
  global.isWatch = true;
  livereload.listen(ports.livereload)
  gulp.watch(path('{base}/**/{templates}/**'), ['templates-ng']);
  gulp.watch(path('{base}/index.+(html|jade|pug)'), ['templates-index']);
  gulp.watch(path('{base}/{images}/**'), ['images']);
  gulp.watch(path('{base}/{fonts}/**'), ['fonts']);
  gulp.watch([
    path('{base}/{styles}/**'),
    path('{base}/{scripts}/**'),
    path('{base}/{images}/sprites/**')
  ], ['styles']);
});

