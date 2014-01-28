describe('Static Element methods', function() {
  it('uses the native matchesSelector', function() {
    var div = document.createElement('div');
    div.innerHTML = '<span class="foo"></span><input type="button"></input>';
    expect(Element.matches(div.firstChild, '.foo')).toBe(true);
    expect(Element.matches(div.lastChild, '[type="button"]')).toBe(true);
  });
});