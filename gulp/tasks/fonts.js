'use strict';

var gulp = require('gulp'),
    path = require('../utils').path,
    del  = require('del');

gulp.task('fonts-clean', function (cb) {
  del([path('dest/fonts')], cb)
})

gulp.task('fonts', ['fonts-clean'], function () {
  return gulp
          .src(path('base/fonts') + '/**')
          .pipe(gulp.dest(path('dest/fonts')));
});
