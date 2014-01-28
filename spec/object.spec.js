describe('Static Object methods', function() {
  it('uses the isObject method correctly', function() {
    expect(Object.isObject([])).toBe(false);
    expect(Object.isObject({})).toBe(true);
  });
  
  it('serializes a hash into a "params" type string', function() {
    expect(Object.serialize({foo: 'bar', baz: 'qux'})).toEqual("foo=bar&baz=qux");
  });
  
  it('deserializes a params-type str into a hash', function() {
    expect(Object.deserialize("foo=bar&baz=qux")).toEqual({foo: 'bar', baz: 'qux'});
  });

  it('extends an object', function() {
    var one = {foo: 'bar'}, two = {foo: 'baz', qux: {vop: ['zim']}};
    expect(one.foo).toBe('bar');
    Object.extend(one, two);
    expect(one.foo).toBe('baz');
    expect(one.qux.vop[0]).toBe('zim');    
  });  
});