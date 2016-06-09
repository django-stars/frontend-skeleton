'use strict';

var _ = require('lodash');

try {
  var local = require('../local.json');
} catch(e) {
  // for prod we don't need local config
  var local = require('../local.default.json')
}

// copy configs from local.json
_.extend(exports, local);

exports.paths = {
  imagemin: '.imagemin',
  base: 'src', // source base directory
  dest: local.STATIC_PATH || 'static',   // destination base directory

  scripts: 'app',     // -> 'dest/app.js'
  styles: 'sass',  // -> 'dest/styles.css'
  images: 'img',
  sprites: 'img/sprites',
  fonts: 'fonts',
  templates: 'templates',

  root: '.'
}

exports.ports = {
  server: 3000,
  livereload: 35729
}

exports.minification = {
  images: true,
  vendors: true,
  scripts: true,
  styles: true
}

// ALARM! DANGEROUS! don't change if not sure what are you doing
exports.writeFilesSimultaneously = true
