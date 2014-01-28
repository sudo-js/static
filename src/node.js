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
