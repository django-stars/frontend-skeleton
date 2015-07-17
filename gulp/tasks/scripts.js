var gulp = require('gulp'),
    _ = require('underscore'),
    utils = require('../utils'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    del  = require('del'),
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
    gulpif = require('gulp-if');

    path = utils.path,
    error = utils.error;

gulp.task('scripts-clean', function (cb) {
  del([path('dest/entry')], cb)
})

gulp.task('scripts-watch', ['scripts-clean'], function() {
  bundler = watchify(
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
    .transform(babelify)

  return bundle(bundler)
});

gulp.task('scripts', ['scripts-clean'], function() {
  var bundler = makeBrowserifyBundler()
  bundler.transform(babelify)
  return bundle(bundler);
});


function makeBrowserifyBundler(options) {
  options = _.assign({}, options || {}, {
    basedir: path('base/scripts'),
    paths: [path('base/scripts', true)],
    entries: path('entry'),
    extensions: ['.jsx'],
  })
  return browserify(options)
}

function bundle(bundler) {
  return bundler.bundle()
          .on('error', error)
          .pipe(source(path('entry')))
          .pipe(ngAnnotate())
          .pipe(gulpif(global.isProduction, buffer()))
          .pipe(gulpif(global.isProduction, uglify()))
          .pipe(gulp.dest(path('dest')));
}

