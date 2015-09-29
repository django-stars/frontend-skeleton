
import {inject} from 'angular-mocks'
import Module1Controller from './module1.controller';

describe('module1 controller', function() {
  var ctrl, scope;

  beforeEach(
    inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller(Module1Controller, {$scope: scope, greeting: 'module 1 loaded'});
    })
  );

  it("check greeting", function() {
    expect(ctrl.greeting).toEqual('module 1 loaded');
  });
});
