'use strict';

@Inject('greeting', '$http')
export default class Module1Controller {// extends Injectable {
  constructor() {
    // 'greeting' value is automatically injected into this.greeting
    // this.$http is angular $http service
  }

  any() {
    this.text = 5;
  }

}
