var gulp = require('gulp'),
    Server = require('karma').Server,
    gutil = require('gulp-util'),
    path = require('../utils').path;

/**
 * Run test once and exit
 */
gulp.task('unit-test', function (done) {
    new Server({
        configFile: path('root/karma.conf.js', true)
    }, done).start();
});