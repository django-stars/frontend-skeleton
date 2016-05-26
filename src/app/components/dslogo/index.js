'use strict';

import angular from 'angular';
import DSLogoComponent from './dslogo-component';

export default angular
  .module('dsApp.dsLogo', [])
  .component('dsLogo', DSLogoComponent)
  .value('version', '0.0.1-1')
  .name
