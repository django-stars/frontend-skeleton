describe('Sceleton App', function() {
  beforeEach(function() {
    // FIXME should be automatially called at start
    require('./helper').initE2e();
  });

  describe('module 1 link', function() {
    it('should be clickable', function() {
      expect(element.all(by.css('.menu li a')).first().click());
      expect(element(by.css('div[ui-view] a')).click());
      expect(element(by.model('ctrl.text')).getAttribute('value')).toEqual('5');
    });
  });

  describe('module 2 counter', function() {
    it('should be increasable', function() {
      expect(element.all(by.css('.menu li a')).get(1).click());
      expect(element(by.css('button')).click());
      expect(element(by.css('h2')).getText()).toEqual('1');
      expect(element(by.css('button')).click());
      expect(element(by.css('h2')).getText()).toEqual('2');
    });
  });
});
