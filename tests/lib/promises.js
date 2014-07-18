"use strict";
var assert = require('proclaim');
var expect = assert.strictEqual;
var promises = require('../../lib/promises');
function asyncDouble(num, cb) {
  setTimeout(cb.bind(null, null, num * 2), 20);
}
function asyncError(cb) {
  setTimeout(cb.bind(null, new Error('oops')), 20);
}
test('it should failed because done() should be called before promise()', function() {
  assert.throws(promises.promise, 'No promise in stack, done() should be called before');
});
test('done() and promise() should work', function() {
  var callback = promises.done();
  assert.isFunction(callback);
  var promise = promises.promise();
  assert.isInstanceOf(promise, Promise);
  promise = promise.then(function(result) {
    expect(result, 20);
  });
  callback(null, 20);
  return promise;
});
test('done() and promise() should work when there is an error', function() {
  var callback = promises.done();
  assert.isFunction(callback);
  var promise = promises.promise();
  assert.isInstanceOf(promise, Promise);
  promise = promise.then(function() {
    assert.notOk(true, 'This should never be called');
  }).catch(function(err) {
    expect(err, 'test error');
  });
  callback('test error');
  return promise;
});

//# sourceMappingURL=promises.js.map