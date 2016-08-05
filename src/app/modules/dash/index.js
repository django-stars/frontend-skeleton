import angular from 'angular';
import DashController from './dash.controller';

export default angular.module('dsApp.dash', [])
  .controller('DashController', DashController)
  .name;
