var gulp = require('gulp'),
    path = require('../utils').path,
    jade = require('gulp-jade'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    del = require('del'),
    error = require('../utils').error,
    Server = require('karma').Server,
    //protractor = require('gulp-protractor').protractor;
    angularProtractor = require('gulp-angular-protractor');


gulp.task('test', ['test-unit', 'test-e2e']);

gulp.task('test-e2e', function () {
  return gulp
    .src([path('root/tests-e2e/**/*.spec.js', true)])
    .pipe(angularProtractor({
      configFile: path('root/protractor.conf.js', true),
      args: ['--baseUrl', 'http://127.0.0.1:3001'],
      autoStartStopServer: true,
      //debug: true
    }))
    .on('error', error);
});

/**
 * Run test once and exit
 */
gulp.task('test-unit', function (done) {
  new Server({
    configFile: path('root/karma.conf.js', true)
  }, done).start();
});
