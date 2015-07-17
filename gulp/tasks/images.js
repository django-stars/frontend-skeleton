var gulp = require('gulp'),
    path = require('../utils').path,
    del  = require('del');

gulp.task('images-clean', function (cb) {
  del([path('dest/images')], cb)
})

gulp.task('images', ['images-clean'], function () {
  return gulp
          .src(path('base/images') + '/**')
          .pipe(gulp.dest(path('dest/images')));
});
