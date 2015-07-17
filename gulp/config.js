
exports.paths = {
  base: 'frontend', // source base directory
  dest: 'static',   // destination base directory
  entry: 'app.js',    // entry script point

  scripts: 'app',     // -> 'dest/app.js'
  styles: 'sass',  // -> 'dest/styles.css'
  images: 'img',
  fonts: 'fonts',
  templates: 'templates'
}

exports.ports = {
  server: 3000,
  livereload: 35729
}
