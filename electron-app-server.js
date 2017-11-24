'use strict';

var express = require('express'),
    http    = require('http'),
    morgan  = require('morgan'),
    proxy   = require('http-proxy-middleware'),
    url     = require('url'),

var app = express();

// log all requests to the console
app.use(morgan('dev'));

// serve static files
app.use('/static', express.static(path('{dest}')));

// Proxy API requests to backend
var urlData = url.parse(config.BACKEND_URL);
var backendBaseURL = urlData.protocol + '//' + urlData.host;

var options = {
    changeOrigin: true,
    target: backendBaseURL
};

if (urlData.auth) {
  options.auth = urlData.auth
}

var proxies = [config.API_URL].concat(config.PROXIES);

proxies.forEach(function(p) {
  app.use(p, proxy(backendBaseURL + p, options));
})

// serve index.html for all routes to leave routing up to Angular
app.all('/*', function(req, res) {
  res.send('No data!')
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
