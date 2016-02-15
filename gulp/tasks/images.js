'use strict';

var gulp = require('gulp'),
    error = require('../utils').error,
    path = require('../utils').path,
    imagemin = require('gulp-imagemin'),
    gulpif = require('gulp-if'),
    changed = require('gulp-changed'),
    config = require('../config'),
    runSequence = require('run-sequence');

gulp.task('images-minify', function () {
  return gulp
          .src(path('{base}/{images}/**')).on('error', error)
          .pipe(changed(path('{imagemin}/{images}')).on('error', error))
          .pipe(imagemin().on('error', error))
          .pipe(gulp.dest(path('{imagemin}/{images}')))
});

gulp.task('images-copy-minified', function() {
  return gulp
          .src(path('{imagemin}/{images}/**')).on('error', error)
          .pipe(gulp.dest(path('{dest}/{images}')));
});

gulp.task('images-copy-simple', function() {
  return gulp
          .src(path('{base}/{images}/**')).on('error', error)
          .pipe(gulp.dest(path('{dest}/{images}')));
})

gulp.task('images', function (cb) {
  var shouldMinify = global.isProduction && config.minification.images;

  if(shouldMinify) {
    runSequence('images-minify', 'images-copy-minified', cb);
  } else {
    runSequence('images-copy-simple', cb);
  }
});
