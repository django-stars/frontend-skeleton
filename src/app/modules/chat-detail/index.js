import angular from 'angular';
import ChatDetailController from './chat-detail.controller';

export default angular.module('dsApp.chatDetail', [])
  .controller('ChatDetailController', ChatDetailController)
  .name;
