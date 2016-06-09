'use strict';

var gulp = require('gulp'),
    _ = require('lodash'),
    utils = require('../utils'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    fs = require('fs'),
    livereload = require('gulp-livereload'),
    // automatically .$inject
    ngAnnotate = require('gulp-ng-annotate'),
    // CommonJS
    browserify = require('browserify'),
    // watch file changes
    watchify = require('watchify'),
    // es6, jsx
    babelify = require('babelify'),
    // uglify for production
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),

    path = utils.path,
    error = utils.error,
    config = require('../config'),

    babelifyOptions = {
      presets: ['es2015'],
      plugins: ['syntax-decorators', 'ng-annotate']
    };

gulp.task('scripts-watch', function() {
  var bundler = watchify(
    makeBrowserifyBundler(
      _.assign({}, watchify.args, {
        debug: true //source maps
      })
    )
  )
  bundler
    .on('update', function() {
      return bundle(bundler).pipe(livereload())
    })
    .on('log', console.log)
    .transform(babelify.configure(babelifyOptions))

  return bundle(bundler)
});

gulp.task('scripts', function() {
  var bundler = makeBrowserifyBundler()
  bundler.transform(babelify.configure(babelifyOptions))
  return bundle(bundler);
});

var packageJson = require('../../package.json');
var dependencies = Object.keys(packageJson && packageJson.dependencies || {});
var browserShims = Object.keys(packageJson && packageJson.browser || {});
var vendors = _.uniq(
      dependencies
        .concat(browserShims)
        .concat(['babel-polyfill'])
    );

gulp.task('scripts-vendor', function() {
  var isExists = fs.existsSync(path('{destEndpoint}/vendor.js')),
      currentStat = fs.statSync(path('package.json')),
      lastStat = isExists ? fs.statSync(path('{destEndpoint}/vendor.js')) : {mtime: -99999};

  if(currentStat.mtime > lastStat.mtime) {
    // build vendors.js
    return browserify()
      .require(vendors)
      .transform({global: true}, 'browserify-shim')
      .bundle()
      .on('error', error)
      .pipe(source('vendor.js'))
      .pipe(gulpif(global.isProduction && config.minification.vendors, buffer()))
      .pipe(gulpif(global.isProduction && config.minification.vendors, uglify()))
      .pipe(gulp.dest(path('{dest}')));
  } else {
    // simple copy already builded file
    return gulp
      .src(path('{destEndpoint}/vendor.js'))
      .pipe(gulp.dest(path('{dest}')))
  }
})

function makeBrowserifyBundler(options) {
  options = _.assign({}, options || {}, {
    basedir: path('{base}/{scripts}'),
    paths: [path('{base}/{scripts}', true)],
    entries: 'app.js',
    //extensions: ['.jsx'],
  })
  var bundler = browserify(options)
  bundler.external(vendors);
  return bundler;
}

function bundle(bundler) {
  return bundler.bundle()
          .on('error', error)
          .pipe(source('app.js'))
          .pipe(ngAnnotate())
          .pipe(gulpif(global.isProduction && config.minification.scripts, buffer()))
          .pipe(gulpif(global.isProduction && config.minification.scripts, uglify()))
          .pipe(gulp.dest(path('{dest}')));
}

