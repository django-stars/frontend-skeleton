'use strict';

export default routes;

// @ngInject
function routes($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/not_found');

  $stateProvider

    .state('state1', {
      url: '/state1',
      template: require('modules/module1/templates/panel'),
      controller: 'Module1Controller',
      controllerAs: 'ctrl'
    })

    .state('state2', {
      url: '/state2',
      template: require('modules/module2/templates/panel'),
      controller: 'Module2Controller',
      controllerAs: 'ctrl'
    })

    .state('state3', {
      url: '/state3',
      template: require('modules/module3/templates/panel'),
      controller: 'Module3Controller',
      controllerAs: 'ctrl'
    })

    .state('404', {
      url: '/not_found',
      template: require('modules/main/templates/404')
    })
}
