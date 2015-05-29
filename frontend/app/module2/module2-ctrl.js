var angular = require('angular');

angular.module('dsApp.module2', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    /*$routeProvider.when('/module2', {
      templateUrl: 'module2/templates/pane.html',
      controller: 'Module2Ctrl'
    });*/
  }])
  .controller('Module2Ctrl', [function() {
    //
  }]);
