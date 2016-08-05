'use strict';

var gulp = require('gulp'),
    utils = require('../utils'),
    compass = require('compass-importer'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    gulpif = require('gulp-if'),
    cleanCss = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),

    config = require('../config'),
    path = utils.path,
    error = utils.error;

gulp.task('styles', ['sprites'], function() {
  return gulp.src(path('{base}/{styles}/app.sass'))
    .pipe(gulpif(!global.isProduction, sourcemaps.init()))
    .pipe(
      sass({
        includePaths: [
          path('node_modules', true),
          path('{base}/{scripts}', true),
          path('{dest}', true), // need to include sprites.sass
        ],
        outputStyle: global.isProduction ? 'compressed' : 'expanded',
        importer: compass,
        // debug info
        //sourceComments: true
      })
      .on('error', error)
    )
    .pipe(gulpif(!global.isProduction, sourcemaps.write()))
    .on('error', error)
    .pipe(gulpif(global.isProduction && config.minification.styles, cleanCss({processImport: false})))
    .pipe(gulp.dest(path('{dest}')))
    .pipe(livereload());
});
