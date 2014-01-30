(function(window) {
// ###deserialize
// Placed on the Object Object to allow a 'paramaterized' string to be turned
// into a hash and returned
//
// `param` {string} `str`
// `returns` {object}
Object.deserialize = function deserialize(str) {
  var obj = {}, seg = str.split('&'), i, s;
  for(i = 0; i < seg.length; i++) {
    if(!seg[i]) continue;
    s = seg[i].split('=');
    obj[s[0]] = s[1];
  }
  return obj;
};
// ###extend
// Copy the (non-inherited) key:value pairs from <n> source objects to a single target object.
//
// `params` {objects} A target object followed by <n> source objects
// `returns` {object} A single object
Object.extend = function extend() {
  var args = Array.prototype.slice.call(arguments),
    targ = args.shift(), i, obj, keys;
  // iterate over each passed in obj remaining
  for(obj; args.length && (obj = args.shift());) {
    keys = Object.keys(obj);
    for(i = 0; i < keys.length; i++) {
      targ[keys[i]] = obj[keys[i]];
    }
  }
  return targ;
};
// ###isObject
// Ye olde toString fallback to see if a passed in argument is an object.
// Really you should test the other cases (Array.isArray for example) but this
// does 'even' the API a little
//
// `param` {*}
// `returns` {bool}
Object.isObject = function isObject(arg) {
  return Object.prototype.toString.call(arg) === '[object Object]';
};
// ###serialize
// Placed on the Object Object to allow a hash of data to be turned into a 
// 'paramaterized' string and returned.
//
// `param` {object} `obj`
// `returns` {string}
Object.serialize = function serialize(obj) {
  var keys = Object.keys(obj), len = keys.length, params = [], i;
  params.add = function(k, v) {this.push(window.escape(k) + '=' + window.escape(v));};
  for (i = 0; i < len; i++) {params.add(keys[i], obj[keys[i]]);}
  return params.join('&').replace(/%20/g, '+');
};
// ###escape
// Placed on the String Object to Escape a string for HTML interpolation
//
// `param` {string}
// `returns` {string}
String.escape = function strescape(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
};
// ###expand
// placed this on the String Object as a class method
// designed to be used with the "${}" placeholders like the upcoming
// native string interpolation (ES6).
// Uses the sudo.expandExpression
//
// `param` {string} `str`
// `param` {object} `data`
// `returns` {string}
String.expand = function expand(str, data) {
  return str.replace(window._stringExpandExpression_,
    function(match, key) {return data[key];});
};
// ###_stringExpandExpression_
// The Regular Expression to use to search for delimiters in a String.expand operation.
// Placed on the window object this way so that you can override to taste.
if(!window._stringExpandExpression_) window._stringExpandExpression_ = /\$\{(.+?)\}/g;// ###debounce
// Thanks to http://underscorejs.org/
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
//
// `param` {function} `fn`
// `param` {number} `wait`
// `param` {*} `immediate`
// `returns` {function}
Function.debounce = function debounce(fn, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if(!immediate) fn.apply(context, args);
    };
    var callNow = immediate && !timeout;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    if(callNow) fn.apply(context, args);
  };
};
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
// ###create
// TODO: update with comments and specs
Node.create = function create(str) {
  var wrap = document.createElement('div');
  wrap.innerHTML = str;
  return wrap.firstElementChild;
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
// ###forEach (NodeList)
// This is a, hopefully, shortlived bit of syntactic sugar for the fact that,
// at the moment, there isn't a succinct way to iterate over a NodeList such as `Array.forEach`.
// This method will simply construct a `for` loop around the passed in NodeList and call the
// provided function with each item in it, returning the list
//
// `param` {nodeList} `list`
// `param` {function} `fn`
// `returns` {nodeList} `list`
NodeList.forEach = function nlforEach(list, fn) {
  var len = list.length, i;
  for (i = 0; i < len; i++) {
    fn(list[i]);
  }
  return list;
};
// ###filter (NodeList)
// Given a nodeList, push a reference to every node that passes the passed-in
// truthy-test (fn) into an array and return the array. We cannot return a
// nodeList as this would modify the DOM.
//
// `param` {nodeList} `list`
// `param` {function} `fn`
// `returns` {array}
NodeList.filter = function nlfilter(list, fn) {
  var len = list.length, nodes = [], i;
  for (i = 0; i < len; i++) {
    // there is no accessible constructor for a nodeList, so use childNodes
    if(fn(list[i])) nodes.push(list[i]);
  }
  return nodes;
};
// ###map (NodeList)
// Given a nodeList, push the result of each node, after performing
// a given operation (fn) on it, into an array and return the array.
//
// `param` {nodeList} `list`
// `param` {function} `fn`
// `returns` {array}
NodeList.map = function nlmap(list, fn) {
  var len    = list.length,
      result = [],
      i;

  for (i = 0; i < len; i++) {
    result.push(fn(list[i]));
  }

  return result;
};
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
};window._staticJsVersion_ = "0.1.1";

}).call(this, this);