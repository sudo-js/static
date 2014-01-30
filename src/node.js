// ###closestParent
// Traverse the DOM upwards in heirarchy from a given DOM node checking if
// a match to a given selector is found. The matching node is returned or
// falsey if nothing found.
//
// `param` {node} `node`
// `param` {str} `sel`. A CSS selector
// `returns` {node|bool}
Node.closestParent = function closestParent(node, sel) {
  while(node && !(Element.matches(node, sel))) {
    node = !Node.isDocument(node) && node.parentNode;
  }
  return node;
};
// ###getHeight
// As there as no unified way to measure the height of a
// node || document we abstract that here. We do not test
// for `window` as that is an easy case to test for proir to calling this method.
//
// `param` {*} `node`
// `returns`{number}
Node.getHeight = function getHeight(node) {
  if(Node.isDocument(node)) return node.documentElement.scrollHeight;
  return node.offsetHeight;
};
// ###getWidth
// As there as no unified way to measure the width of an
// node || document we abstract that here.
// Again, we do not test for `window`
//
// `param` {*} `node`
// `returns`{number}
Node.getWidth = function getWidth(node) {
  if(Node.isDocument(node)) return node.documentElement.scrollWidth;
  return node.offsetWidth;
};
// ###isDocument
// Return truthy is the passed in node is the document object. Placed here on
// the Node Class Object as `document` is a `Node` type.
//
// `param` {node} `node`
// `returns` {bool}
Node.isDocument = function isDocument(node) {
  return node.nodeType === node.DOCUMENT_NODE;
};
// ###show
// Makes a node visible in the DOM by modifying
// the `display` attribute, if necessary.

// `param` {node} `node`
// `returns` {node}
Node.show = function show(node) {
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
    } else {
      node.style.display = 'block';
    }
  }
};
// ###hide
// Makes a node invisible in the DOM by modifying
// the `display` attribute, if necessary.

// `param` {node} `node`
// `returns` {node}
Node.hide = function hide(node) {
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
    } else {
      node.style.display = 'none';
    }
  }
};
// ###toggle
// Toggles the visibility of a node in the DOM by modifying
// the `display` attribute, if necessary.

// `param` {node} `node`
// `returns` {node}
Node.toggle = function toggle(node) {
  var displayValue = getComputedStyle(node)['display'];

  displayValue === 'none' ?
    Node.show(node) :
    Node.hide(node);
};
