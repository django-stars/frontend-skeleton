import angular from 'angular';
import ChatsService from './chats.service';
import ChatsController from './chats.controller';

export default angular.module('dsApp.chats', [])
  .service('ChatsService', ChatsService)
  .controller('ChatsController', ChatsController)
  .name;
