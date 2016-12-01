'use strict';

var gulp = require('gulp'),
    utils = require('../utils'),
    path = utils.path,
    error = utils.error,
    config = require('../config'),
    pug = require('gulp-pug'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache'),
    template = require('gulp-template'),
    livereload = require('gulp-livereload'),
    runSequence = require('run-sequence');

var TEMPLATE_HEADER = 'require("angular");angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {';

gulp.task('templates-index', function () {
  var templateLocals = {
    VERSION: Math.floor(Date.now() / 1000),
    API_URL: config.API_URL
  };
  return gulp
          .src(path('{base}/index.+(html|jade|pug)'))
          .pipe(gulpif(/.*\.(jade|pug)$/,
            pug({locals: templateLocals, pretty: true, basedir: path('{base}/{scripts}', true)})
          ).on('error', error))
          .pipe(gulpif('*.html',
            template(templateLocals)
          ))
          .pipe(gulp.dest(path('{dest}')))
          .pipe(livereload());
});

gulp.task('templates-ng', function () {
  return gulp
          .src(path('{base}/**/{templates}/**/*.*'))
          .pipe(gulpif(/.*\.(jade|pug)$/,
            pug({basedir: path('{base}/{scripts}', true)})
          ).on('error', error))
          .pipe(templateCache({
            filename: 'templates.js',
            //moduleSystem: 'Browserify', // TODO
            standalone: true,
            templateHeader: TEMPLATE_HEADER,
            transformUrl: function(url) {
              return url.replace(/\\/g, '/').replace(/^app\//, '').replace(/\/templates\//, '/');
            }
          }))
          .pipe(gulp.dest(path('{dest}')))
          .pipe(livereload());
});

gulp.task('templates', ['templates-index', 'templates-ng'])
