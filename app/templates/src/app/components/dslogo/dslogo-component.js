'use strict';

//@Inject('$http')
export default class DSLogoComponent {
  constructor() {
    this.restrict = 'E';
    this.template = '<div class="ds-logo">{{today}}</div>';
    this.scope = {
      today: '=',
    }
  }

  /*link(scope, el, attrs) {

  }*/

  /*compile() {

  }*/

}
