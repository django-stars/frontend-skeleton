'use strict';

export default routes;

// @ngInject
function routes($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/module1');

  $stateProvider

    .state('state1', {
      url: '/state1',
      templateUrl: 'modules/module1/panel.html',
      controller: 'Module1Controller',
      controllerAs: 'ctrl'
    })

    .state('state2', {
      url: '/state2',
      templateUrl: 'modules/module2/panel.html',
      controller: 'Module2Controller',
      controllerAs: 'ctrl'
    })

    .state('state3', {
      url: '/state3',
      templateUrl: 'modules/module3/panel.html',
      controller: 'Module3Controller',
      controllerAs: 'ctrl'
    })
}
