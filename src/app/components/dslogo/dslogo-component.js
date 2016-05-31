'use strict';

import DSLogoController from './dslogo-component.controller'

let DSLogoComponent = {
  template: '<div class="ds-logo">{{$ctrl.today}}</div>',
  controller: DSLogoController,
  bindings: {
    today: '<'
  }
};

export default DSLogoComponent;
