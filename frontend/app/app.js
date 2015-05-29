var angular = require('angular'),
    lodash = require('lodash'),
    angularRoute = require('angular-route'),
    view1 = require('./module1/module1-ctrl'),
    view2 = require('./module2/module2-ctrl');

// Declare app level module which depends on views, and components
angular.module('dsApp', [
  'ngRoute',
  'dsApp.module1',
  'dsApp.module2'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/module1'});
}]);

angular
  .element(document.getElementsByTagName('html')[0])
  .ready(function() {
    // bootstrap the app manually
    angular.bootstrap(document, ['dsApp']);
  });
