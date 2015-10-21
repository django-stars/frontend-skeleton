'use strict';

var gulp = require('gulp'),
    utils = require('../utils'),
    del  = require('del'),
    compass = require('gulp-compass'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),

    config = require('../config'),
    path = utils.path,
    error = utils.error;

gulp.task('styles-clean', function (cb) {
  del([path('dest/styles.css')], cb)
})

gulp.task('styles', ['styles-clean', 'fonts'], function() {
  return gulp.src(path('base/styles/app.sass'))
    .pipe(
      compass({
        import_path: [
          path('node_modules', true), path('base/scripts', true)
        ],
        require: [path('sass-inline-import.rb', true)],
        //debug: true,
        style: global.isProduction ? 'compressed' : 'expanded',
        sourcemap: !global.isProduction,
        font: path('dest/fonts', true),
        image: path('images'),
        generated_images_path: path('dest/images', true),
        sass: path('styles'),
        css: path('dest', true),
        relative: false,
        project: path('base', true),
        http_path: '/' + path('dest'),
      })
    )
    .on('error', error)
    .pipe(rename(function(p) {
      p.basename = 'styles'
    }))
    .pipe(gulpif(global.isProduction && config.minification.styles, minifyCss()))
    .pipe(gulp.dest(path('dest')))
    .pipe(livereload());
});

