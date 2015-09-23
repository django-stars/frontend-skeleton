'use strict';

module.exports = displayLogo;
// TODO es6
function displayLogo() {
  return {
      restrict: 'E',
      scope: {
        today: '=',
      },
      template: '<div class="ds-logo">{{today}}</div>',
      link
  }
}

function link(scope, el, attrs) {
  //debugger
  //elm.text(attrs.version);
};
