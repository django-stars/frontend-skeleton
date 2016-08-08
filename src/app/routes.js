'use strict';

export default routes;

// @ngInject
function routes($stateProvider, $urlRouterProvider) {
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('ds', {
    url: '',
    abstract: true,
    templateUrl: 'modules/content/content.html',
    controller: 'MainController',
    controllerAs: 'ctrl'
  })

  .state('ds.tab', {
    url: '/tab',
    abstract: true,
    views: {
      'main-view': {
        templateUrl: 'modules/main/tabs.html',
        controller: 'MainController',
        controllerAs: 'ctrl'
      }
    }
  })

  // Each tab has its own nav history stack:

  .state('ds.tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'modules/dash/tab-dash.html',
        controller: 'DashController',
        controllerAs: 'ctrl'
      }
    }
  })

  .state('ds.tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'modules/chats/tab-chats.html',
          controller: 'ChatsController',
          controllerAs: 'ctrl'
        }
      }
    })
    .state('ds.tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'modules/chat-detail/chat-detail.html',
          controller: 'ChatDetailController',
          controllerAs: 'ctrl'
        }
      }
    })

  .state('ds.tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'modules/account/tab-account.html',
        controller: 'AccountController',
        controllerAs: 'ctrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
}
