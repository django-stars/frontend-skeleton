'use strict';

let DSLogoComponent = {
  template: '<div class="ds-logo">{{$ctrl.today}}</div>',
  controller: DSLogoController,
  bindings: {
    today: '<'
  }
};

export default DSLogoComponent;

//@Inject('$http')
class DSLogoController {
  constructor() {

  }
}
