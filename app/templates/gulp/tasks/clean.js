'use strict';

var gulp = require('gulp'),
    path = require('../utils').path,
    del  = require('del');

gulp.task('clean', function(cb) {
  del(path('{destEndpoint}_**'), cb);
});

gulp.task('clean-all', function(cb) {
  del([path('{destEndpoint}**'), path('.imagemin_cache')], cb)
})
