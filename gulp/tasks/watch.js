var gulp = require('gulp'),
    path = require('../utils').path,
    livereload = require('gulp-livereload');

gulp.task('watch', function() {
  livereload.listen(/* TODO port */)
  gulp.watch(path('base/**/templates') + '/**', ['templates']);
  gulp.watch(path('base/images') + '/**', ['images']);
  gulp.watch(path('base/fonts') + '/**', ['fonts']);
  gulp.watch(path('base/styles') + '/**', ['styles']);
  gulp.watch(path('base/images/sprites') + '/**', ['styles']);
});

