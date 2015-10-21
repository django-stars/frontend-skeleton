'use strict';

@Inject('greeting', '$http')
export default class Module1Controller {
  constructor() {
    // 'greeting' value is automatically injected into this.greeting
    // this.$http is angular $http service
  }

  any() {
    this.text = 5;
  }

}
