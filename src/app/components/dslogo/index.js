'use strict';

import angular from 'angular';
import logoDirective from './dslogo-directive';

export default angular
  .module('dsApp.dsLogo', [])
  .directive('dsLogo', logoDirective)
  .value('version', '0.0.1-1')
  .name
