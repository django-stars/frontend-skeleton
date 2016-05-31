'use strict';

var gulp = require('gulp'),
    path = require('../utils').path;

gulp.task('fonts', function () {
  return gulp
          .src(path('{base}/{fonts}/**'))
          .pipe(gulp.dest(path('{dest}/{fonts}')));
});
