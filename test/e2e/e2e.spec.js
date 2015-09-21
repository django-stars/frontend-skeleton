describe('Sceleton App', function() {
    beforeEach(function() {
        require('../helper').initE2e();
    });
    it('should be clickable', function() {
        expect(element.all(by.css('.menu li a')).first().click());
        expect(element(by.model('link')).click());
        expect(element(by.model('text')).getAttribute('value')).toEqual('5');
    });
});