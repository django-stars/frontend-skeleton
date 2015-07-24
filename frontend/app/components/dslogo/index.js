'use strict';

var angular = require('angular'),
    logoDirective = require('./dslogo-directive');

module.exports = 'dsApp.dsLogo';

angular
  .module('dsApp.dsLogo', [])
  .directive('dsLogo', logoDirective)
  .value('version', '0.0.1-1')
