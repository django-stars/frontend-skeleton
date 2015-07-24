'use strict';

// @ngInject
module.exports = function($scope, $interval) {
  $scope.greeting = 'module 3 loaded'

  $scope.today = today()
  var stop = $interval(function() {
    $scope.today = today()
  }, 1000)

  $scope.$on('$destroy', function() {
    // Make sure that the interval is destroyed too
    $interval.cancel(stop);
    stop = undefined;
  });
}

function today() {
  return new Date().toUTCString();
}
