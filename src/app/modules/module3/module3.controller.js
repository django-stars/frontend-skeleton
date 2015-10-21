'use strict';

@Inject('$scope', '$interval')
export default class Module3Controller {
  constructor() {
    this.greeting = 'module 3 loaded'

    this.today = today()

    var interval = this.$interval(
      ()=> this.today = today(),
      1000
    )

    this.$scope.$on('$destroy', ()=> {
      console.log('destroyed!');
      // Make sure that the interval is destroyed too
      this.$interval.cancel(interval);
      interval = undefined;
    });
  }
}

function today() {
  return new Date().toUTCString();
}
