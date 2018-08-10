import 'babel-polyfill'
import smoothScroll from 'smoothscroll-polyfill'
smoothScroll.polyfill()

// should be after React import for IE11
// 'require' used because inside condition
if(!!window.MSInputMethodContext && !!document.documentMode) { // IE11 check
  require('core-js/modules/es6.symbol')
  require('whatwg-fetch')

  // classList.toggle polyfill for IE
  DOMTokenList.prototype.toggle = function(token, force) {
    if(force === undefined) {
      force = !this.contains(token)
    }

    return this[force ? 'add' : 'remove'](token)
  }
}

// node.remove polyfill fro IE
;(function() {
  var arr = [window.Element, window.CharacterData, window.DocumentType]
  var args = []

  arr.forEach(function(item) {
    if(item) {
      args.push(item.prototype)
    }
  })

  // from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
  ;(function(arr) {
    arr.forEach(function(item) {
      if(item.hasOwnProperty('remove')) {
        return
      }
      Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          this.parentNode.removeChild(this)
        },
      })
    })
  })(args)
})()

;(function() {
  // IE
  if(!Element.prototype.scrollIntoViewIfNeeded) {
    Element.prototype.scrollIntoViewIfNeeded = function() {
      const rect = this.getBoundingClientRect()
      if(rect.top < 0 || rect.bottom > window.innerHeight || rect.left < 0 || rect.right > window.innerWidth) {
        this.scrollIntoView()
      }
    }
  }
})()
