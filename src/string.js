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
if(!window._stringExpandExpression_) window._stringExpandExpression_ = /\$\{(.+?)\}/g;