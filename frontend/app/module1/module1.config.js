'use strict';

var Module1Controller = require('./module1.controller'),
    {templatePath} = require('utils');

module.exports = Module1Config

// @ngInject
function Module1Config($stateProvider) {
  $stateProvider.state('state1', {
    url: '/state1',
    templateUrl: templatePath('module1', 'panel.html'),
    controller: Module1Controller
  });
}
