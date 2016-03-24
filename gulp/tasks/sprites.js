var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    sprity = require('sprity'),
    utils = require('../utils'),
    path = utils.path,
    error = utils.error;

// generate sprite.png and _sprite.scss
gulp.task('sprites', function () {
  return sprity.src({
    src: path('{base}/{sprites}/**/*.') + '{png,jpg}',
    cssPath: path('/{destEndpoint}/{images}'),
    //processor: 'sass',
    style: 'sprites.sass',
    name: Math.floor(Date.now() / 1000), // uniq sprite file name
    //'style-type': 'sass',
    split: true,
    prefix: 'sprite',
    template: path('{base}/sprity.sass.hbs'),
    dimensions: [
      {"ratio": 1, "dpi": 72},
      {"ratio": 2, "dpi": 192}
    ]
  })
  .on('error', error)
  .pipe(
    gulpif(
      '*.png',
      gulp.dest(path('{dest}/img/')),
      gulp.dest(path('{dest}'))
    )
  )
});
