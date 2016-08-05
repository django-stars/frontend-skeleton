import angular from 'angular';
import AccountController from './account.controller';

export default angular.module('dsApp.account', [])
  .controller('AccountController', AccountController)
  .name;
