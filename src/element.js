// ###matches (Element)
// Unfortunately the matchesSelector methods are all hidden behind prefixes ATM.
// set the useable one, if not, then return the bool.
//
// `param` {element} `el`. A DOM 1 nodetype
// `param` {string}  `sel`. A CSS selector
// `returns` {bool}
Element.matches = function matches(el, sel) {
  if (el.nodeType !== 1) return false;
  // normalize the native selector match fn until all the prefixes are dropped
  if(!window._normalizedMatchesSelector_) {
    window._normalizedMatchesSelector_ = el.webkitMatchesSelector || el.mozMatchesSelector ||
    el.msMatchesSelector || el.oMatchesSelector || el.matchesSelector;
  }
  return window._normalizedMatchesSelector_.call(el, sel);
};
