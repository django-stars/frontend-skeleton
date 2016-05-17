'use strict';

import angular from 'angular';
import DSLogoComponent from './dslogo-component';
import {directiveFactory} from 'utils';

export default angular
  .module('dsApp.dsLogo', [])
  .directive('dsLogo', directiveFactory(DSLogoComponent))
  .value('version', '0.0.1-1')
  .name
