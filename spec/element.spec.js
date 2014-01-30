describe('Static Element methods', function() {
  beforeEach(function() {
    document.querySelector('#testTarget').innerHTML = '';
  });
  
  it('uses the native matchesSelector', function() {
    var div = document.createElement('div');
    div.innerHTML = '<span class="foo"></span><input type="button"></input>';
    expect(Element.matches(div.firstChild, '.foo')).toBe(true);
    expect(Element.matches(div.lastChild, '[type="button"]')).toBe(true);
  });
  
  describe('Show', function () {
    it('shows an element with default "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.show(el);

      expect(getComputedStyle(el)['display']).toBe('inline');
      expect(el.style.display).toBe('');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('shows an element with inline "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.show(el);

      expect(getComputedStyle(el)['display']).toEqual('block');
      expect(el.style.display).toEqual('block');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('shows an element with inline "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.show(el);

      expect(getComputedStyle(el)['display']).toEqual('inline');
      expect(el.style.display).toBe('');
      expect(el.getAttribute('data-old-display')).toEqual('none');
    });

    it('shows an element with css "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '#el { display: block; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.show(el);

      expect(getComputedStyle(el)['display']).toEqual('block');
      expect(el.style.display).toEqual('');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('shows a node with css "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '#el { display: none; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.show(el);

      expect(getComputedStyle(el)['display']).toEqual('block');
      expect(el.style.display).toEqual('block');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('shows an element with inline "display" and css "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';
      style.innerHTML = '#el { display: none; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.show(el);

      expect(getComputedStyle(el)['display']).toEqual('block');
      expect(el.style.display).toEqual('block');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('shows an element with inline "display: none" and css "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
      style.innerHTML = '#el { display: block; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.show(el);

      expect(getComputedStyle(el)['display']).toEqual('block');
      expect(el.style.display).toEqual('');
      expect(el.getAttribute('data-old-display')).toBe('none');
    });
  });
  
  describe('Hide', function () {
    it('hides an element with default "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.hide(el);

      expect(getComputedStyle(el)['display']).toBe('none');
      expect(el.style.display).toBe('none');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('hides an element with inline "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.hide(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('none');
      expect(el.getAttribute('data-old-display')).toBe('block');
    });

    it('hides an element with inline "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.hide(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toBe('none');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('hides an element with css "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '#el { display: block; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.hide(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('none');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('hides an element with css "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '#el { display: none; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.hide(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('hides an element with inline "display" and css "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';
      style.innerHTML = '#el { display: none; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.hide(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('none');
      expect(el.getAttribute('data-old-display')).toEqual('block');
    });

    it('hides an element with inline "display: none" and css "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
      style.innerHTML = '#el { display: block; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.hide(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('none');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });
  });
  
  describe('Toggle', function() {
    it('toggles correctly with default "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.toggle(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('none');
      expect(el.getAttribute('data-old-display')).toBe(null);

      Element.toggle(el);

      expect(getComputedStyle(el)['display']).toEqual('inline');
      expect(el.style.display).toEqual('');
      expect(el.getAttribute('data-old-display')).toBe('none');
    });

    it('toggles correctly with inline "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Element.toggle(el);

      expect(getComputedStyle(el)['display']).toEqual('inline');
      expect(el.style.display).toEqual('');
      expect(el.getAttribute('data-old-display')).toBe('none');

      Element.toggle(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('none');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });
  });
});