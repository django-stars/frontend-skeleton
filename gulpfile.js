var _ = require('underscore'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),

    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    del =  require('del'),

    // TODO for relase
    //uglify = require('gulp-uglify'),

    // CommonJS
    browserify = require('browserify'),
    // TODO live reload
    //watchify = require('watchify'),
    // es6, jsx
    babelify = require('babelify'),
    // coffee
    coffeeify = require('coffee-reactify');

var paths = {
  base: 'frontend', // source base directory
  dest: 'static',   // destination base directory
  entry: 'app.js',    // entry script point

  scripts: 'app',     // -> 'dest/app.js'
  styles: 'sass',  // -> 'dest/styles.css'
  images: 'img',
  fonts: 'fonts'
}

var path = function(p) {
  return p.split('/').map(function(i) {
    return paths[i] || i;
  }).join('/')
}

// SCRIPTS
gulp.task('scripts-clean', function (cb) {
  del([path('dest/entry')], cb)
})
gulp.task('scripts', ['scripts-clean'], function () {
  return browserify({
    basedir: path('base/scripts'),
    entries: path('entry'),
    extensions: ['.jsx', '.coffee', '.cjsx'],
    debug: true
  })
  .transform(coffeeify)
  .transform(babelify)
  .bundle()
  .pipe(source(path('entry')))
  .pipe(gulp.dest(path('dest')));
});

// STYLES
gulp.task('styles-clean', function (cb) {
  del([path('dest/styles.css')], cb)
})
gulp.task('styles', ['styles-clean'], function () {
  return gulp.src(path('base/styles/app.sass'))
    .pipe(
      sass({
        //outputStyle: 'compressed',
        outputStyle: 'expanded',
        // FIXME
        //sourceMap: true,
        //sourceMapEmbed: true,
        fontsDir: path('dest/fonts'),
        fontsPath: path('dest/fonts'),
        imagesDir: path('base/images'),
        imagesPath: path('base/images'),
        generatedImagesDir: path('dest/images'),
        generatedImagesPath: path('dest/images'),
        httpGeneratedImagesPath: path('dest/images'),
        specify: path('base/styles/app.sass'),
        //outFile: path('dest/styles.css'),
        sassDir: path('base/styles'),
        cssDir: path('dest') + '/styles'
      }).on('error', sass.logError)
    )
    .pipe(rename(function(p) {
      p.basename = 'styles'
    }))
    .pipe(gulp.dest(path('dest')));
});

// FONTS
gulp.task('fonts-clean', function (cb) {
  del([path('dest/fonts')], cb)
})
gulp.task('fonts', ['fonts-clean'], function () {
  return gulp.src(path('base/fonts') + '/**')
    .pipe(gulp.dest(path('dest/fonts')));
});

// IMAGES
gulp.task('images-clean', function (cb) {
  del([path('dest/images')], cb)
})
gulp.task('images', ['images-clean'], function () {
  return gulp.src(path('base/images') + '/**')
    .pipe(gulp.dest(path('dest/images')));
});

// BASE TASKS
gulp.task('clean', function(cb) {
  del([path('dest')], cb);
});

// TODO jade templates?

gulp.task('watch', function() {
  gulp.watch(
    ['.js', '.json', '.jsx', '.coffee', '.cjsx'].map(function(ext) {
      return path('base/scripts') + '/**/*' + ext;
    }), ['scripts']
  );
  gulp.watch(path('base/images') + '/**', ['images']);
  gulp.watch(path('base/fonts') + '/**', ['fonts']);
  gulp.watch(path('base/styles') + '/**', ['styles']);
  gulp.watch(path('base/images/sprites') + '/**', ['styles']);
});

gulp.task('build', ['scripts', 'styles', 'images', 'fonts'])

gulp.task('default', ['clean'], function() {
  gulp.start('build', 'watch')
});

// TODO minify task
