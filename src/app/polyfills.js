import 'babel-polyfill'
// import smoothScroll from 'smoothscroll-polyfill'
// smoothScroll.polyfill()

// should be after React import for IE11
// 'require' used because inside condition
if(!!window.MSInputMethodContext && !!document.documentMode) { // IE11 check
  require('core-js/modules/es6.symbol')
  require('whatwg-fetch')
}
