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
