// ###hide
// Makes an element invisible in the DOM by modifying
// the `display` attribute, if necessary.

// `param` {node} `node`
// `returns` {node}
Element.hide = function hide(node) {
  var oldDisplayValue = node.getAttribute('data-old-display');
  // is the element already hidden?
  if (getComputedStyle(node)['display'] === 'none') {
    if (oldDisplayValue === 'none') node.removeAttribute('data-old-display');
  // does an old display value exist?
  } else if (oldDisplayValue === 'none') {
    node.style.display = oldDisplayValue;
    node.removeAttribute('data-old-display');
  // the element is visible and does not have an old display value
  } else {
    // is the element visible with inline styling?
    if (node.style.display && node.style.display !== 'none') {
      node.setAttribute('data-old-display', node.style.display);
      node.style.display = 'none';
    // the element is visible through css
    } else node.style.display = 'none';
  }
};
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
// ###show
// Makes an element visible in the DOM by modifying
// the `display` attribute, if necessary.

// `param` {node} `node`
// `returns` {node}
Element.show = function show(node) {
  var oldDisplayValue = node.getAttribute('data-old-display');
  // is the element already visible?
  if (getComputedStyle(node)['display'] !== 'none') {
    // remove display value
    if (oldDisplayValue !== 'none') node.removeAttribute('data-old-display');
  // does an old display value exist?
  } else if (oldDisplayValue && oldDisplayValue !== 'none') {
    node.style.display = oldDisplayValue;
    node.removeAttribute('data-old-display');
  // the element is not visible and does not have an old display value
  } else {
    // is the element hidden with inline styling?
    if (node.style.display === 'none') {
      node.setAttribute('data-old-display', node.style.display);
      node.style.display = '';
    // the element is hidden through css
    } else node.style.display = 'block';
  }
};
// ###toggle
// Toggles the visibility of an element in the DOM by modifying
// the `display` attribute, if necessary.

// `param` {node} `node`
// `returns` {node}
Element.toggle = function toggle(node) {
  var displayValue = getComputedStyle(node)['display'];

  displayValue === 'none' ?
    Element.show(node) :
    Element.hide(node);
};