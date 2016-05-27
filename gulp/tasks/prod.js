
var gulp = require('gulp'),
    del  = require('del'),
    runSequence = require('run-sequence'),
    path = require('../utils').path;

gulp.task('prod', ['clean'], function(cb) {
  global.isProduction = true;
  runSequence('build-assets', 'scripts', 'prod-clean', 'prod-dest', 'clean', cb)
});

gulp.task('prod-clean', function(cb) {
  del(path('{destEndpoint}')).then(function(){
    cb()
  });
})

gulp.task('prod-dest', function() {
  return gulp.src(path('{dest}/**'))
          .pipe(gulp.dest(path('{destEndpoint}')));
})
