var local = require('../local.json');

exports.paths = {
  base: 'src', // source base directory
  dest: 'static',   // destination base directory
  entry: 'app.js',    // entry script point

  scripts: 'app',     // -> 'dest/app.js'
  styles: 'sass',  // -> 'dest/styles.css'
  images: 'img',
  fonts: 'fonts',
  templates: 'templates',
  root: '.'
}

exports.ports = {
  server: 3000,
  livereload: 35729
}

exports.API_BASE_URL = local.API_BASE_URL;
