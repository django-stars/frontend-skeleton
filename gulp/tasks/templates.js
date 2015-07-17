var gulp = require('gulp'),
    path = require('../utils').path,
    del  = require('del');

// TODO jade templates?

gulp.task('templates-clean', function (cb) {
  del([path('dest/templates')], cb)
})

gulp.task('templates', ['templates-clean'], function () {
  return gulp
          .src(path('base/**/templates') + '/**')
          .pipe(gulp.dest(path('dest/templates')));
});

