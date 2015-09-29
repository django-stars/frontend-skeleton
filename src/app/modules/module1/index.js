'use strict';

import angular from 'angular';
import Module1Controller from './module1.controller';

export default angular
  .module('dsApp.module1', [])
  .value('greeting', 'module 1 loaded')
  .controller('Module1Controller', Module1Controller)
  .name
