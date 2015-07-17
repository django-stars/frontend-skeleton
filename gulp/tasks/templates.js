var gulp = require('gulp'),
    path = require('../utils').path,
    jade = require('gulp-jade'),
    gulpif = require('gulp-if'),
    del = require('del');

gulp.task('templates-clean', function (cb) {
  del([path('dest/templates')], cb)
})

gulp.task('templates', ['templates-clean'], function () {
  return gulp
          .src(path('base/**/templates') + '/**')
          .pipe(gulpif('*.jade', jade()))
          .pipe(gulp.dest(path('dest/templates')));
});
