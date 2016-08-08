import 'ionic';
import angular from 'angular';
//import _ from 'lodash';
import 'ionic-angular';
import 'angular-animate';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';

import Dash from 'modules/dash';
import Chats from 'modules/chats';
import ChatDetail from 'modules/chat-detail';
import Account from 'modules/account';

import MainController from './main.controller';

import routes from 'routes';

var API_URL = angular.element('body').data('api-base-url');

// Declare app level module which depends on views, and components
export default angular.module('dsApp', [
    ngSanitize,
    'templates',
    'ngAnimate',
    'ionic',
    uiRouter,
    Dash,
    Chats,
    ChatDetail,
    Account
  ])
  .constant('API_URL', API_URL)
  .controller('MainController', MainController)
  .config(routes)
  .run(run)
  .name;


function run($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}
