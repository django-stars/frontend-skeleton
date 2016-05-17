'use strict';

//import "babelify/polyfill"; // TODO check

import angular from 'angular';
import dsApp from 'modules/main'; // main module

angular
  .element(document.getElementsByTagName('html')[0])
  .ready(function() {
    // bootstrap the app manually
    angular.bootstrap(document, [dsApp]);
  });

