/* jshint maxlen: 200 */
/* global test */

"use strict";

var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

var utils = require(lib + 'index');

test('toInt should return a Number', function() {
    expect(utils.toInt('10') , 10);
});


test('isString with a string param should return true', function() {
    expect(utils.isString(''), true);
});

test('isString with a number param should return false', function() {
    expect(utils.isString(10), false);
});

test('isObject with a object param should return true', function() {
    expect(utils.isObject({}), true);
});

test('isObject with a string param should return false', function() {
    expect(utils.isObject(''), false);
});

test('isFunction with a function param should return true', function() {
    expect(utils.isFunction(function() {}), true);
});

test('isFunction with a string param should return false', function() {
    expect(utils.isFunction(''), false);
});

test('isArray with a array param should return true', function() {
    expect(utils.isArray([]), true);
});

test('isArray with a string param should return false', function() {
    expect(utils.isArray(''), false);
});

test('isNumber with a string param should return false', function() {
    expect(utils.isNumber('0'), false);
});

test('isNumber with a number param should return true', function() {
    expect(utils.isNumber(1), true);
});

test('isInteger with a integer param should return true', function() {
    expect(utils.isInteger(1), true);
});

test('isInteger with a float param should return false', function() {
    expect(utils.isInteger(0.1), false);
});

test('escape should return an escaped html string', function() {
    expect(utils.escape('<div>hello & "welcome"'), '&lt;div&gt;hello &amp; &quot;welcome&quot;');
});

test('escapeUrl should return an escaped url string', function() {
    expect(utils.escapeUrl('<div>hello & "welcome"'), '<div>hello &amp; "welcome"');
});


test('entries should work on an array', function() {
    var iterator = utils.entries([1, 2]);
    var result = iterator.next();
    assert.notOk(result.done);
    assert.deepEqual(result.value, [0, 1]);
    result = iterator.next();
    assert.notOk(result.done);
    assert.deepEqual(result.value, [1, 2]);
    result = iterator.next();
    assert.ok(result.done);
});

test('entries should work on an object', function() {
    var iterator = utils.entries({ a: 12, b: 24 });
    var result = iterator.next();
    assert.notOk(result.done);
    assert.deepEqual(result.value, ['a', 12]);
    result = iterator.next();
    assert.notOk(result.done);
    assert.deepEqual(result.value, ['b', 24]);
    result = iterator.next();
    assert.ok(!!result.done);
});

test('entries should work on an Map', function() {
    var iterator = utils.entries(new Map([['a', 12], ['b', 24 ]]));
    var result = iterator.next();
    assert.notOk(result.done);
    assert.deepEqual(result.value, ['a', 12]);
    result = iterator.next();
    assert.notOk(result.done);
    assert.deepEqual(result.value, ['b', 24]);
    result = iterator.next();
    assert.ok(result.done);
});


test('filter should work on an array', function() {
    var result = utils.filter([1, 2, 3, 4], function(v) {
      return v % 2;
    });
    assert.deepEqual(result, [1, 3]);
});

test('filter should work on an object', function() {
    var result = utils.filter({ a: 1, b: 2, c: 3, d: 4 }, function(v) {
      return v % 2;
    });
    assert.deepEqual(result, { a: 1, c: 3 });
});

test('find should find an element in an array', function() {
    var result = utils.find([ { v: 1, ok: false }, { v: 2, ok: true }, { v: 3, ok: true }], function(v) {
      return v.ok;
    });
    expect(result.v, 2);
});

test('find should find an element in an object', function() {
    var result = utils.find({
        a: { v: 1, ok: false },
        b: { v: 2, ok: true },
        c: { v: 3, ok: true }
    }, function(v) {
      return v.ok;
    });
    expect(result.v, 2);
});

test('findIndex should find the index of an element in an array', function() {
    var result = utils.findIndex([ { v: 1, ok: false }, { v: 2, ok: true }, { v: 3, ok: true }], function(v) {
      return v.ok;
    });
    expect(result, 1);
});

test('findIndex should find the index of an element in an object', function() {
    var result = utils.findIndex({
        a: { v: 1, ok: false },
        b: { v: 2, ok: true },
        c: { v: 3, ok: true }
    }, function(v) {
      return v.ok;
    });
    expect(result, 'b');
});


test('findEach should call the callback for each elements in an array', function() {
    var results = [];
    utils.forEach([ 1, 2, 3 ], function(v, i) {
      return results.push([ i, v ]);
    });
    assert.deepEqual(results, [ [0, 1], [1, 2], [2, 3] ]);
});

test('findEach should call the callback for each elements in an object', function() {
    var results = [];
    utils.forEach({ a: 1, b: 2, c: 3 }, function(v, key) {
      return results.push([ key, v ]);
    });
    assert.deepEqual(results, [ ['a', 1], ['b', 2], ['c', 3] ]);
});

test('findEach should call the callback for each elements in an Map', function() {
    var results = [];
    utils.forEach(new Map([['a', 12], ['b', 24 ]]), function(v, key) {
      return results.push([ key, v ]);
    });
    assert.deepEqual(results, [ ['a', 12], ['b', 24] ]);
});

test('join should joins all elements of an Array into a string', function() {
    var result = utils.join([ 1, 2, 3 ], '-');
    expect(result, '1-2-3');
});

test('join should joins all elements of an Object into a string', function() {
    var result = utils.join({ a: 1, b: 2, c: 3 }, '-');
    expect(result, '1-2-3');
});

test('map should transform all elements of an Array into a new array', function() {
    var result = utils.map([ 1, 2, 3 ], function(v) {
      return v*2;
    });
    assert.deepEqual(result, [2, 4, 6]);
});

test('map should transform all elements of an Object into a new array', function() {
    var result = utils.map({ a: 1, b: 2, c: 3 }, function(v) {
      return v*2;
    });
    assert.deepEqual(result, { a: 2, b: 4, c: 6 });
});

test('reduce should reduce all elements of an Array into a new one', function() {
    var result = utils.reduce([ 1, 2, 3 ], function(previous, v, i) {
      return previous + v;
    }, 5);
    expect(result, 5 + 1 + 2 + 3);
    result = utils.reduce([ 1, 2, 3 ], function(previous, v, i) {
      return previous += i + '_' + v + ',';
    }, '');
    expect(result, '0_1,1_2,2_3,');
});

test('reduce should reduce all elements of an Object into a new one', function() {
    var result = utils.reduce({ a: 1, b: 2, c: 3 }, function(previous, v, key) {
      return previous + v;
    }, 5);
    expect(result, 5 + 1 + 2 + 3);
    result = utils.reduce({ a: 1, b: 2, c: 3 }, function(previous, v, i) {
      return previous += i + '_' + v + ',';
    }, '');
    expect(result, 'a_1,b_2,c_3,');
});

test('reduceRight should reduce all elements from the right of an Array into a new one', function() {
    var result = utils.reduceRight([ 1, 2, 3 ], function(previous, v, i) {
      return previous + v;
    }, 5);
    expect(result, 5 + 1 + 2 + 3);
    result = utils.reduceRight([ 1, 2, 3 ], function(previous, v, i) {
      return previous += i + '_' + v + ',';
    }, '');
    expect(result, '2_3,1_2,0_1,');
});

test('reduceRight should reduce all elements from the right of an Object into a new one', function() {
    var result = utils.reduceRight({ a: 1, b: 2, c: 3 }, function(previous, v, key) {
      return previous + v;
    }, 5);
    expect(result, 5 + 1 + 2 + 3);
    result = utils.reduceRight({ a: 1, b: 2, c: 3 }, function(previous, v, i) {
      return previous += i + '_' + v + ',';
    }, '');
    expect(result, 'c_3,b_2,a_1,');
});


test('some should forEach elements of an Array until the callback returns true', function() {
    var results = [];
    var result = utils.some([ 1, 2, 3 ], function(v, i) { results.push(v); return v === 2; }, 5);
    expect(result, true);
    assert.deepEqual(results, [1, 2]);
});

test('some should forEach elements of an Object until the callback returns true', function() {
    var results = {};
    var result = utils.some({ a: 1, b: 2, c: 3 }, function(v, key) { results[key] = v; return v === 2; }, 5);
    expect(result, true);
    assert.deepEqual(results, { a:1, b:2 });
});

test('defineProperty should work', function() {
    var o = {};
    var res = utils.defineProperty(o, 'a', 1);
    expect(res, o);
    expect(res.a, 1);
});

test('defineProperties should work', function() {
    var o = {};
    var res = utils.defineProperties(o, {
        a: 1,
        b: 2
    });
    expect(res, o);
    expect(res.a, 1);
    expect(res.b, 2);
});

//# sourceMappingURL=index.js.map