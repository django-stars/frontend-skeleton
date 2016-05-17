'use strict';

import angular from 'angular';

export function directiveFactory(Component) {

  if(!Component.prototype.compile) {
    // create an empty compile function if none was defined.
    Component.prototype.compile = () => {}
  }

  var originalCompileFn = _cloneFunction(
    Component.prototype.compile
  );

  // Decorate the compile method to automatically return the link method (if it exists)
  // and bind it to the context of the constructor (so `this` works correctly).
  // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
  // returns `this.link` from within the compile function.
  _override(Component.prototype, 'compile', function () {
    return function () {
      originalCompileFn.apply(this, arguments);

      if (Component.prototype.link) {
        return Component.prototype.link.bind(this);
      }
    };
  });

  return _createFactoryFn(Component);
}

export function factory(Factory) {
  return _createFactoryFn(Factory);
}

/**
 * Clone a function
 * @param original
 * @returns {Function}
 */
function _cloneFunction(original) {
    return function() {
        return original.apply(this, arguments);
    };
}

/**
 * Override an object's method with a new one specified by `callback`.
 * @param object
 * @param methodName
 * @param callback
 */
function _override(object, methodName, callback) {
    object[methodName] = callback(object[methodName])
}

/**
 * Convert a constructor function into a factory function which returns a new instance of that
 * constructor, with the correct dependencies automatically injected as arguments.
 *
 * In order to inject the dependencies, they must be attached to the constructor function with the
 * `$inject` property annotation.
 *
 * @param constructorFn
 * @returns {Array.<T>}
 * @private
 */
function _createFactoryFn(constructorFn) {

  var fn = function(...args) {
    //return new Component(...args)
    var instance = new constructorFn(...args);
    for (var key in instance) {
      // fix problem with undefined templateUrl, compile, link
      instance[key] = instance[key];
    }
    return instance;
  }

  if(constructorFn.$inject) {
    // copy injections
    fn.$inject = constructorFn.$inject;
  }

  return fn
}
