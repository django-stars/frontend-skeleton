'use strict';

import dsLogo from 'components/dslogo';
import angular from 'angular';
import Module3Controller from './module3.controller';

export default angular
  .module('dsApp.module3', [dsLogo])
  .controller('Module3Controller', Module3Controller)
  .name
