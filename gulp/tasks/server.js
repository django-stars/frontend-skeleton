'use strict';

var gulp    = require('gulp'),
    express = require('express'),
    path    = require('../utils').path,
    config  = require('../config'),
    morgan  = require('morgan'),
    inject  = require('connect-inject'),
    proxy   = require('http-proxy-middleware'),
    url     = require('url');

var livereloadURI = 'http://127.0.0.1:' + config.ports.livereload + '/livereload.js?port=' + config.ports.livereload;

gulp.task('server', function() {

  var app = express();

  // log all requests to the console
  app.use(morgan('dev'));

  // serve static files
  app.use('/static', express.static(path('dest')));

  // Proxy API requests to backend
  var urlData = url.parse(config.API_BASE_URL);
  var backendBaseURL = urlData.protocol + '//' + urlData.host;
  app.use(urlData.pathname, proxy(config.API_BASE_URL));
  // Django's static
  app.use('/s/', proxy(backendBaseURL + '/s/'));

  if(global.isWatch) {
    // inject livereload
    app.use(inject({
      snippet: '<script src="' + livereloadURI + '"></script>'
    }))
  }

  // serve index.html for all routes to leave routing up to Angular
  app.all('/*', function(req, res) {
    res.sendFile(path('dest/index.html'), { root: '.' });
  });

  app.listen(config.ports.server, function() {
    console.log('Development server started at http://localhost:%s', config.ports.server);
  });

});
