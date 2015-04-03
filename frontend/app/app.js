'use strict';

define([
  'angular',
  'angularRoute',
  'module1/Module1Ctrl',
  'module2/Module2Ctrl'
], function(angular, angularRoute, view1, view2) {
  // Declare app level module which depends on views, and components
  return angular.module('dsApp', [
    'ngRoute',
    'dsApp.module1',
    'dsApp.module2'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/module1'});
  }]);
});

