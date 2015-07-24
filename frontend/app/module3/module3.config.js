'use strict';

var Module3Controller = require('./module3.controller'),
    {templatePath} = require('utils');

module.exports = Module3Config

// @ngInject
function Module3Config($stateProvider) {
  $stateProvider.state('state3', {
    url: '/state3',
    templateUrl: templatePath('module3', 'panel.html'),
    controller: Module3Controller
  });
}
