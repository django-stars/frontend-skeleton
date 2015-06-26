'use strict';

var angular = require('angular'),
    config = require('./module1.config');

module.exports = 'dsApp.module1';

angular
  .module('dsApp.module1', [])
  .config(config)
