'use strict';

// @ngInject
module.exports = Module1Controller;

function Module1Controller ($scope) {
  $scope.greeting = 'module 1 loaded';
  $scope.any = function () {
    $scope.text = '5';
  }
}
