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
