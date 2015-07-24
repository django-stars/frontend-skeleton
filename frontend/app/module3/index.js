'use strict';

var angular = require('angular'),
    config = require('./module3.config'),
    dsLogo = require('components/dslogo');

module.exports = 'dsApp.module3';

angular
  .module('dsApp.module3', [dsLogo])
  .config(config)
