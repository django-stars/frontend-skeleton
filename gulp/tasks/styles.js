'use strict';

var gulp = require('gulp'),
    utils = require('../utils'),
    del  = require('del'),
    compass = require('compass-importer'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),

    config = require('../config'),
    path = utils.path,
    error = utils.error;

gulp.task('styles', ['fonts'], function() {
  return gulp.src(path('{base}/{styles}/app.sass'))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: [
          path('node_modules', true), path('{base}/{scripts}', true)
        ],
        outputStyle: global.isProduction ? 'compressed' : 'expanded',
        sourcemap: !global.isProduction,
        importer: compass,
        // FIXME sprites
        //image: path('{images}'),
        //generated_images_path: path('{dest}/{images}', true),
        //http_path: path('/{destEndpoint}'),

        // debug info
        //sourceComments: true
      })
      .on('error', error)
    )
    .pipe(sourcemaps.write())
    .on('error', error)
    .pipe(gulpif(global.isProduction && config.minification.styles, minifyCss()))
    .pipe(gulp.dest(path('{dest}')))
    .pipe(livereload());
});

