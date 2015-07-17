'use strict';

var angular = require('angular'),
    {templatePath} = require('utils');

angular
  .module('dsApp.module2')
  .config(Module2Config)

function Module2Config($stateProvider) {
  $stateProvider.state('state2', {
    url: '/state2',
    templateUrl: templatePath('module2', 'panel.html'),
    controller: 'Module2Controller'
  });
}
