describe('Static String methods', function() {  
  it('interpolates values from a hash in a string', function() {
    var str = "Frankly my ${foo}, I don't give a ${bar}.";
    expect(String.expand(str, {foo: 'dear', bar: 'damn'})).toEqual("Frankly my dear, I don't give a damn.");
  });
  // cool side effect is that arrays work
  it('interpolates values from an array in a string', function() {
    var str = "Frankly my ${0}, I don't give a ${1}.";
    expect(String.expand(str, ['dear', 'damn'])).toEqual("Frankly my dear, I don't give a damn.");
  });
  
  it('escapes an html string', function() {
    var str = "<>'\"&\/";
    expect(String.escape(str)).toEqual('&lt;&gt;&#x27;&quot;&amp;&#x2F;');
  });
});