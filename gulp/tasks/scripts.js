var gulp = require('gulp'),
    _ = require('underscore'),
    utils = require('../utils'),
    source = require('vinyl-source-stream'),
    del  = require('del'),
    livereload = require('gulp-livereload'),
    // automatically .$inject
    ngAnnotate = require('gulp-ng-annotate'),
    // CommonJS
    browserify = require('browserify'),
    // TODO live reload
    watchify = require('watchify'),
    // es6, jsx
    babelify = require('babelify'),

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
          .pipe(gulp.dest(path('dest')));
}

