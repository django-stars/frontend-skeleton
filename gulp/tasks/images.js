'use strict';

var gulp = require('gulp'),
    path = require('../utils').path,
    imagemin = require('gulp-imagemin'),
    gulpif = require('gulp-if'),
    changed = require('gulp-changed'),
    config = require('../config');

gulp.task('images', function () {
  var shouldMinify = global.isProduction && config.minification.images;

  return gulp
          .src(path('{base}/{images}/**'))
          .pipe(gulpif(shouldMinify, changed(path('.imagemin/{images}'))))
          .pipe(gulpif(shouldMinify, imagemin()))
          .pipe(gulpif(shouldMinify, gulp.dest(path('.imagemin/{images}'))))
          .pipe(gulpif(shouldMinify, gulp.src(path('.imagemin/{images}/**'))))
          .pipe(gulp.dest(path('{dest}/{images}')));
});
