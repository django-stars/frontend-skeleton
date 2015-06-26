'use strict';

var angular = require('angular');

module.exports = 'dsApp.module2'

angular
  .module('dsApp.module2', [])

// should be after dsApp.module2 initialize
require('./module2.config');
require('./module2.controller');
