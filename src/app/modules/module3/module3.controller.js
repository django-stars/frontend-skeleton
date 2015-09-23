'use strict';

// @ngInject
export default class Module3Controller {
  constructor($scope, $interval) {
    this.greeting = 'module 3 loaded'

    this.today = today()

    var interval = $interval(
      ()=> this.today = today(),
      1000
    )

    $scope.$on('$destroy', function() {
      console.log('destroyed!');
      // Make sure that the interval is destroyed too
      $interval.cancel(interval);
      interval = undefined;
    });
  }
}

function today() {
  return new Date().toUTCString();
}
