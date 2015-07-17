'use strict';

var gulp    = require('gulp'),
    express = require('express'),
    path    = require('../utils').path,
    ports   = require('../config').ports,
    morgan  = require('morgan'),
    inject = require('connect-inject');

var livereloadPath = 'node_modules/gulp-livereload/node_modules/tiny-lr/node_modules/livereload-js/dist/livereload.js',
    livereloadURI = '/livereload.js?port=' + ports.livereload;

gulp.task('server', function() {

  var app = express();

  // log all requests to the console
  app.use(morgan('dev'));

  // serve static files
  app.use('/static', express.static(path('dest')));

  // inject livereload
  app.use(inject({
    snippet: '<script src="' + livereloadURI + '"></script>'
  }))
  app.use('/livereload.js', express.static(livereloadPath));

  // serve index.html for all routes to leave routing up to Angular
  app.all('/*', function(req, res) {
    res.sendFile('index.html', { root: '.' });
  });

  app.listen(ports.server, function() {
    console.log('Development server started at http://localhost:%s', ports.server);
  });

});
