/* global module */
"use strict";

module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      {pattern: 'app/bower_components/angular/angular.js', included: false},
      {pattern: 'app/bower_components/angular-route/angular-route.js', included: false},
      {pattern: 'app/bower_components/angular-mocks/angular-mocks.js', included: false},
      {pattern: 'app/components/**/*.js', included: false},
      {pattern: 'app/view*/**/*.js', included: false},
      {pattern: 'app/app.js', included: false},
    ],

    frameworks: ['jasmine', 'browserify'],

    browsers : ['PhantomJS'],
    /*
    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-browserify'
            ],
    */

    singleRun: true,

    
  });
};
