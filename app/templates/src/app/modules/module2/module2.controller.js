'use strict';

export default class Module2Controller {
  constructor() {
    this.greeting = 'module 2 loaded'
    this.counter = 0;
  }

  increaseCounter() {
    this.counter++;
  }
}
