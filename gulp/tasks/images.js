'use strict';

var gulp = require('gulp'),
    path = require('../utils').path,
    imagemin = require('gulp-imagemin'),
    gulpif = require('gulp-if'),
    changed = require('gulp-changed'),
    config = require('../config');

gulp.task('images', function () {
  return gulp
          .src(path('base/images') + '/**')
          .pipe(changed(path('dest/images')))
          .pipe(gulpif(global.isProduction && config.minification.images, imagemin()))
          .pipe(gulp.dest(path('dest/images')));
});
