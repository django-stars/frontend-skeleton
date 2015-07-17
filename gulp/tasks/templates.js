var gulp = require('gulp'),
    path = require('../utils').path,
    jade = require('gulp-jade'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('templates-clean', function (cb) {
  del([path('dest/templates')], cb)
})

gulp.task('templates', ['templates-clean'], function () {
  return gulp
          .src(path('base/**/templates') + '/**')
          .pipe(gulpif('*.jade', jade()))
          .pipe(rename(function(path) {
            path.dirname = path.dirname.replace(/\/templates/, '')
          }))
          .pipe(gulp.dest(path('dest/templates')));
});
