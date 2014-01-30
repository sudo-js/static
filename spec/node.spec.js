describe('Static Node methods', function() {
  beforeEach(function() {
    document.querySelector('#testTarget').innerHTML = '';
  });

  it('finds the closest parent matching a selector', function() {
    var div = document.createElement('div');
    div.innerHTML = '<section><span class="foo"></span><input type="button"></input></section>';
    expect(Node.closestParent(div.lastChild, 'div')).toEqual(div);
  });

  it('correctly identifies the document', function() {
    expect(Node.isDocument(document)).toBe(true);
  });

  describe('Show', function () {
    it('shows a node with default "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.show(el);

      expect(getComputedStyle(el)['display']).toBe('inline');
      expect(el.style.display).toBe('');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('shows a node with inline "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.show(el);

      expect(getComputedStyle(el)['display']).toEqual('block');
      expect(el.style.display).toEqual('block');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('shows a node with inline "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.show(el);

      expect(getComputedStyle(el)['display']).toEqual('inline');
      expect(el.style.display).toBe('');
      expect(el.getAttribute('data-old-display')).toEqual('none');
    });

    it('shows a node with css "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '#el { display: block; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.show(el);

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

      Node.show(el);

      expect(getComputedStyle(el)['display']).toEqual('block');
      expect(el.style.display).toEqual('block');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('shows a node with inline "display" and css "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';
      style.innerHTML = '#el { display: none; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.show(el);

      expect(getComputedStyle(el)['display']).toEqual('block');
      expect(el.style.display).toEqual('block');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('shows a node with inline "display: none" and css "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
      style.innerHTML = '#el { display: block; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.show(el);

      expect(getComputedStyle(el)['display']).toEqual('block');
      expect(el.style.display).toEqual('');
      expect(el.getAttribute('data-old-display')).toBe('none');
    });
  });

  describe('Hide', function () {
    it('hides a node with default "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.hide(el);

      expect(getComputedStyle(el)['display']).toBe('none');
      expect(el.style.display).toBe('none');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('hides a node with inline "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.hide(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('none');
      expect(el.getAttribute('data-old-display')).toBe('block');
    });

    it('hides a node with inline "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
      style.innerHTML = '';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.hide(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toBe('none');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('hides a node with css "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '#el { display: block; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.hide(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('none');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('hides a node with css "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el">foobar</span>';
      style.innerHTML = '#el { display: none; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.hide(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });

    it('hides a node with inline "display" and css "display: none"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';
      style.innerHTML = '#el { display: none; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.hide(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('none');
      expect(el.getAttribute('data-old-display')).toEqual('block');
    });

    it('hides a node with inline "display: none" and css "display"', function() {
      var body = document.querySelector('#testTarget'),
          div  = document.createElement('div'),
          style = document.createElement('style'),
          el;

      div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
      style.innerHTML = '#el { display: block; }';

      body.appendChild(style);
      body.appendChild(div);

      el = body.querySelector('#el');

      Node.hide(el);

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

      Node.toggle(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('none');
      expect(el.getAttribute('data-old-display')).toBe(null);

      Node.toggle(el);

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

      Node.toggle(el);

      expect(getComputedStyle(el)['display']).toEqual('inline');
      expect(el.style.display).toEqual('');
      expect(el.getAttribute('data-old-display')).toBe('none');

      Node.toggle(el);

      expect(getComputedStyle(el)['display']).toEqual('none');
      expect(el.style.display).toEqual('none');
      expect(el.getAttribute('data-old-display')).toBe(null);
    });
  });
});
