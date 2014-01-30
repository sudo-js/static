describe('Static Node methods', function() {

  it('finds the closest parent matching a selector', function() {
    var div = document.createElement('div');
    div.innerHTML = '<section><span class="foo"></span><input type="button"></input></section>';
    expect(Node.closestParent(div.lastChild, 'div')).toEqual(div);
  });

  it('correctly identifies the document', function() {
    expect(Node.isDocument(document)).toBe(true);
  });

});
