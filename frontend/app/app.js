var angular = require('angular'),
    lodash = require('lodash'),
    uiRouter = require('angular-ui-router'),
    module1 = require('module1'),
    module2 = require('module2'),
    module3 = require('module3');

// Declare app level module which depends on views, and components
angular.module('dsApp', [
  uiRouter,
  module1, // or 'dsApp.module1'
  module2, // or 'dsApp.module2'
  module3
]).config(['$urlRouterProvider', function($urlRouterProvider) {
  //$urlRouterProvider.otherwise({redirectTo: '/module1'});
}]);

angular
  .element(document.getElementsByTagName('html')[0])
  .ready(function() {
    // bootstrap the app manually
    angular.bootstrap(document, ['dsApp']);
  });
