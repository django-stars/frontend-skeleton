'use strict';

var angular = require('angular');

angular
  .module('dsApp.module2')
  .config(Module2Config)

function Module2Config($stateProvider) {
  $stateProvider.state('state2', {
    url: '/state2',
    // FIXME template url
    templateUrl: '/static/templates/app/module2/templates/panel.html',
    controller: 'Module2Controller'
  });
}
