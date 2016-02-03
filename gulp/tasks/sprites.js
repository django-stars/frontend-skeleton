var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    sprity = require('sprity'),
    path = require('../utils').path;

// generate sprite.png and _sprite.scss
gulp.task('sprites', function () {
  return sprity.src({
    src: path('{base}/{sprites}/**/*.') + '{png,jpg}',
    cssPath: path('/{destEndpoint}/{images}'),
    processor: 'sass',
    style: 'sprites.sass',
    'style-type': 'sass',
    split: true,
    prefix: 'sprite',
    dimensions: [
      {"ratio": 1, "dpi": 72},
      {"ratio": 2, "dpi": 192}
    ]
  })
  .pipe(
    gulpif(
      '*.png',
      gulp.dest(path('{dest}/img/')),
      gulp.dest(path('{dest}'))
    )
  )
});
