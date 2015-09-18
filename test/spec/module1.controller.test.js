require("angular-mocks");
var Module1Controller = require('module1/module1.controller');

describe('module1 controller test', function() {
    var ctrl,
        scope;

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller( Module1Controller, {$scope: scope});
    }));
    it("Should be true", function() {
        expect(scope.greeting).toEqual('module 1 loaded');
    });
});