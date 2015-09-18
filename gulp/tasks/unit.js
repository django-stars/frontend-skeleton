var gulp = require('gulp'),
    Server = require('karma').Server,
    path = require('../utils').path;

/**
 * Run test once and exit
 */
gulp.task('unit', function (done) {
    new Server({
        configFile: path('root/karma.conf.js', true)
    }, done).start();
});