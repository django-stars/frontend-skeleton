'use strict';

var gulp    = require('gulp'),
    express = require('express'),
    http    = require('http'),
    utils   = require('../utils'),
    config  = require('../config'),
    morgan  = require('morgan'),
    inject  = require('connect-inject'),
    proxy   = require('http-proxy-middleware'),
    url     = require('url'),
    path    = utils.path;

var livereloadURI = 'http://127.0.0.1:' + config.ports.livereload + '/livereload.js?port=' + config.ports.livereload;

gulp.task('server', function() {

  var app = express();

  // log all requests to the console
  app.use(morgan('dev'));

  // serve static files
  app.use('/static', express.static(path('{dest}')));

  // Proxy API requests to backend
  var urlData = url.parse(config.API_BASE_URL);
  var backendBaseURL = urlData.protocol + '//' + urlData.host;
  app.use(urlData.pathname, proxy(config.API_BASE_URL));
  // Django's static
  app.use('/s/', proxy(backendBaseURL + '/s/'));
  // Django's media files
  app.use('/m/', proxy(backendBaseURL + '/m/'));

  if(global.isWatch) {
    // inject livereload
    app.use(inject({
      snippet: '<script src="' + livereloadURI + '"></script>'
    }))
  }

  // serve index.html for all routes to leave routing up to Angular
  app.all('/*', function(req, res) {
    res.sendFile(path('{dest}/index.html'), { root: '.' });
  });

  var server = http.createServer(app);

  server.on('error', function(err){
    if(err.code === 'EADDRINUSE'){
      console.log('ERROR! Another development server instance is already started at port ' + config.ports.server);
    } else {
      throw err;
    }
  });

  server.listen(config.ports.server, function() {
    console.log('Development server started at http://localhost:%s', config.ports.server);
  });

});
