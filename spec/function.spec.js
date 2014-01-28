describe('Static String methods', function() {  
  it('debounces a function', function() {
    var counter = 0;
    var incr = function(){ counter++; };
    var debouncedIncr = Function.debounce(incr, 32);
    debouncedIncr(); debouncedIncr();
    waits(33);
    debouncedIncr();
    runs(function() {
      expect(counter).toEqual(1);
    });
  });
});