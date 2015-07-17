var gulp = require('gulp'),
    path = require('../utils').path,
    del  = require('del'),
    imagemin = require('gulp-imagemin'),
    gulpif = require('gulp-if'),
    changed = require('gulp-changed');

gulp.task('images', function () {
  return gulp
          .src(path('base/images') + '/**')
          .pipe(changed(path('dest/images')))
          .pipe(gulpif(global.isProduction, imagemin()))
          .pipe(gulp.dest(path('dest/images')));
});
