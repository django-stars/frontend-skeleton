'use strict';

var Module1Controller = require('./module1.controller');

module.exports = Module1Config

// @ngInject
function Module1Config($stateProvider) {
  $stateProvider.state('state1', {
    url: '/state1',
    // FIXME template url
    templateUrl: '/static/templates/app/module1/templates/panel.html',
    controller: Module1Controller
  });
}
