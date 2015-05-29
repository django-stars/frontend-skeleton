'use strict';

var angular = require('angular');

angular.module('dsApp.module1', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/module1', {
      // FIXME template url prefix
      templateUrl: '/static/app/module1/templates/panel.html',
      controller: 'Module1Ctrl'
    });
  }])
  .controller('Module1Ctrl', [function() {
    //
  }]);
