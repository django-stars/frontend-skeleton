
import angular from 'angular';
//import _ from 'lodash';
import uiRouter from 'angular-ui-router';

import module1 from 'modules/module1'
import module2 from 'modules/module2'
import module3 from 'modules/module3'

import routes from 'routes';

var API_URL = angular.element('body').data('api-base-url');

// Declare app level module which depends on views, and components
export default angular.module('dsApp', [
    'templates',
    uiRouter,
    module1,
    module2,
    module3
  ])
  .constant('API_URL', API_URL)
  .config(routes)
  .name;
