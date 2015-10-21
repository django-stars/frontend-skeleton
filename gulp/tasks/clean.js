'use strict';

var gulp = require('gulp'),
    path = require('../utils').path,
    del  = require('del');

gulp.task('clean', function(cb) {
  del([path('dest')], cb);
});
