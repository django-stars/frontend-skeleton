var gulp = require('gulp'),
    path = require('../utils').path,
    config = require('../config'),
    jade = require('gulp-jade'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    del = require('del'),
    templateCache = require('gulp-angular-templatecache'),
    template = require('gulp-template'),
    livereload = require('gulp-livereload'),
    runSequence = require('run-sequence'),
    TEMPLATE_HEADER = 'require("angular");angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {';

gulp.task('templates-clean', function (cb) {
  del([
    path('dest/templates.js'),
    path('dest/index.html')
  ], cb)
});

gulp.task('templates-index', function () {
  var templateLocals = {
    VERSION: Math.floor(Date.now() / 1000),
    API_BASE_URL: config.API_BASE_URL
  };
  return gulp
          .src(path('base/index.+(html|jade)'))
          .pipe(gulpif('*.jade',
            jade({locals: templateLocals, pretty: true})
          ))
          .pipe(gulpif('*.html',
            template(templateLocals)
          ))
          .pipe(gulp.dest(path('dest')))
          .pipe(livereload());
});

gulp.task('templates-ng', function () {
  return gulp
          .src(path('base/**/templates') + '/**/*.*')
          .pipe(gulpif('*.jade', jade()))
          .pipe(templateCache({
            filename: 'templates.js',
            //moduleSystem: 'Browserify', // TODO
            standalone: true,
            templateHeader: TEMPLATE_HEADER,
            transformUrl: function(url) {
              return url.replace(/^app\//, '').replace(/\/templates\//, '/');
            }
          }))
          .pipe(gulp.dest(path('dest')))
          .pipe(livereload());
});

gulp.task('templates', ['templates-clean'], function (cb) {
  runSequence(['templates-index', 'templates-ng'], cb)
});
