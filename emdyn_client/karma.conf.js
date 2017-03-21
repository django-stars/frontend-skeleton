// Karma configuration
// Generated on Fri Sep 11 2015 14:28:13 GMT+0300 (EEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      './src/app/**/*.test.js', // FIXME path
    ],

    // list of files to exclude
    exclude: [
      'no'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './src/app/**/*.js' : ['browserify']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    plugins: [
        'karma-jasmine',
        'karma-browserify',
        'karma-phantomjs-launcher'
    ],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    browserify: {
      debug: true,
      paths: [__dirname + '/src/app'],
      configure: function(bundle) {
        bundle.on('prebundle', function() {
          bundle.transform(require('babelify').configure({
            presets: ['es2015'],
            plugins: ['syntax-decorators', 'ng-annotate']
          }));
        });
      }
    }
  })
};
