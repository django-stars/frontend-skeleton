'use strict';

var gulp = require('gulp'),
    path = require('../utils').path,
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    error = require('../utils').error,
    Server = require('karma').Server,
    angularProtractor = require('gulp-angular-protractor'),
    runSequence = require('run-sequence');


gulp.task('test', ['test-unit-single']);
gulp.task('test-all', ['test-unit', 'test-e2e']);

gulp.task('test-single', function(cb) {
  runSequence('test-unit-single', 'test-e2e-single', cb)
});

// TODO
gulp.task('test-e2e-single', function (cb) { cb() });

gulp.task('test-e2e', function () {
  return gulp
    .src([path('{root}/tests-e2e/**/*.spec.js', true)])
    .pipe(angularProtractor({
      configFile: path('{root}/protractor.conf.js', true),
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
    configFile: path('{root}/karma.conf.js', true),
    singleRun: false,
    autoWatch: true
  }, done).start();
});

gulp.task('test-unit-single', function (done) {
  new Server({
    configFile: path('{root}/karma.conf.js', true),
    singleRun: true,
    autoWatch: false
  }, done).start();
});
