"use strict";
var $__getIteratorRange = function(iterator, index, begin, len) {
  if (index > begin) {
    throw new RangeError();
  }
  if (typeof len === "undefined") {
    len = Infinity;
  }
  var range = [],
      end = begin + len;
  while (index < end) {
    var next = iterator.next();
    if (next.done) {
      break;
    }
    if (index >= begin) {
      range.push(next.value);
    }
    index++;
  }
  return {
    range: range,
    index: index
  };
};
var $__getIterator = function(iterable) {
  var sym = typeof Symbol === "function" && Symbol.iterator || "@@iterator";
  if (typeof iterable[sym] === "function") {
    return iterable[sym]();
  } else if (typeof iterable === "object" || typeof iterable === "function") {
    return $__getArrayIterator(iterable);
  } else {
    throw new TypeError();
  }
};
var $__getArrayIterator = function(array) {
  var index = 0;
  return {next: function() {
      if (index < array.length) {
        return {
          done: false,
          value: array[index++]
        };
      } else {
        return {
          done: true,
          value: void 0
        };
      }
    }};
};
var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';
var promises = require(lib + 'promises');
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
test('forEach() with an array with one value', function() {
  var promise = promises.forEach([new Promise(function(resolve) {
    return resolve('ok');
  })], function(value) {
    return value;
  });
  return promise.then(function(result) {
    assert.deepEqual(result, ['ok']);
  });
});
test('forEach() with an array with several values', function() {
  var promise = promises.forEach(['ok', 'test2', new Promise(function(resolve) {
    return resolve('ok3');
  })], function(value) {
    if (value === 'ok') {
      return new Promise(function(resolve) {
        return resolve('ok1');
      });
    }
    return value;
  });
  return promise.then(function(result) {
    assert.deepEqual(result, ['ok1', 'test2', 'ok3']);
  });
});
test('forEach() with an object with several values', function() {
  var promise = promises.forEach({
    value1: new Promise(function(resolve) {
      return resolve('ok');
    }),
    value2: 'test2',
    value3: new Promise(function(resolve) {
      setTimeout(function() {
        resolve(4);
      }, 20);
    })
  }, function(value) {
    return value;
  });
  return promise.then(function(result) {
    assert.deepEqual(result, {
      value1: 'ok',
      value2: 'test2',
      value3: 4
    });
  });
});
test('forEach() fails', function() {
  var promise = promises.forEach(['test1', 'test2'], function() {
    return new Promise(function(resolve, reject) {
      reject('test error');
    });
  });
  return promise.then(function() {
    assert.notOk(true, 'This should never be called');
  }).catch(function(err) {
    expect(err, 'test error');
  });
});
test('forEach() fails asynchronously', function() {
  var promise = promises.forEach(['test1', new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject('test error');
    }, 20);
  })], function(value) {
    return value;
  });
  return promise.then(function() {
    assert.notOk(true, 'This should never be called');
  }).catch(function(err) {
    expect(err, 'test error');
  });
});
test('creator() should work', function() {
  var var$0 = promises.creator(),
      iterator$0 = $__getIterator(var$0),
      iteratorValue$0 = {index: 0},
      promise = (iteratorValue$0 = $__getIteratorRange(iterator$0, iteratorValue$0.index, 0, 1), iteratorValue$0.range[0]),
      callback = (iteratorValue$0 = $__getIteratorRange(iterator$0, iteratorValue$0.index, 1, 1), iteratorValue$0.range[0]);
  assert.isFunction(callback);
  assert.isInstanceOf(promise, Promise);
  promise = promise.then(function(result) {
    expect(result, 20);
  });
  callback(null, 20);
  return promise;
});
test('promiseCallback() should work', function() {
  var promise = promises.promiseCallback(function(done) {
    assert.isFunction(done);
    done(null, 20);
  });
  assert.isInstanceOf(promise, Promise);
  promise = promise.then(function(result) {
    expect(result, 20);
  });
  return promise;
});

//# sourceMappingURL=promises.js.map