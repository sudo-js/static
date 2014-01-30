describe('Static NodeList methods', function() {
  it('can use NodeList.forEach', function() {
    var div = document.createElement('div'), spn1, spn2;
    div.innerHTML = '<section><span></span><input type="button"></input><span></span><input type="button"></input></section>';
    NodeList.forEach(div.querySelectorAll('span'), function(spn) {
      spn.classList.add('foo');
    });
    spn1 = div.childNodes[0].childNodes[0];
    expect(spn1.classList.contains('foo')).toBe(true);
    spn2 = div.childNodes[0].childNodes[2];
    expect(spn2.classList.contains('foo')).toBe(true);
  });

  it('can use NodeList.filter', function() {
    var div = document.createElement('div'), filtered;
    div.innerHTML = '<section><span></span><a href="#" data-foo="foo"></a><span></span><a href="#"></input></section>';
    filtered = NodeList.filter(div.querySelectorAll('a'), function(spn) {
      return !spn.getAttribute('data-foo');
    });
    expect(filtered.length).toBe(1);
  });

  it('can use NodeList.map', function() {
    var div = document.createElement('ul'), mappedResult;
    div.innerHTML = '<li id="item-1"></li><li id="item-2"></li>';
    mappedResult = NodeList.map(div.querySelectorAll('li'), function(el) {
      return el.id;
    });
    expect(mappedResult).toEqual(['item-1', 'item-2']);
  });
});
