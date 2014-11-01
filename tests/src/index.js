/* jshint maxlen: 200 */
/* global test */

var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

var utils = require(lib + 'index');

test('toInt should return a Number', () => {
    expect(utils.toInt('10') , 10);
});


test('isString with a string param should return true', () => {
    expect(utils.isString(''), true);
});

test('isString with a number param should return false', () => {
    expect(utils.isString(10), false);
});

test('isObject with a object param should return true', () => {
    expect(utils.isObject({}), true);
});

test('isObject with a string param should return false', () => {
    expect(utils.isObject(''), false);
});

test('isFunction with a function param should return true', () => {
    expect(utils.isFunction(function() {}), true);
});

test('isFunction with a string param should return false', () => {
    expect(utils.isFunction(''), false);
});

test('isArray with a array param should return true', () => {
    expect(utils.isArray([]), true);
});

test('isArray with a string param should return false', () => {
    expect(utils.isArray(''), false);
});

test('isNumber with a string param should return false', () => {
    expect(utils.isNumber('0'), false);
});

test('isNumber with a number param should return true', () => {
    expect(utils.isNumber(1), true);
});

test('isInteger with a integer param should return true', () => {
    expect(utils.isInteger(1), true);
});

test('isInteger with a float param should return false', () => {
    expect(utils.isInteger(0.1), false);
});

test('escape should return an escaped html string', () => {
    expect(utils.escape('<div>hello & "welcome"'), '&lt;div&gt;hello &amp; &quot;welcome&quot;');
});

test('escapeUrl should return an escaped url string', () => {
    expect(utils.escapeUrl('<div>hello & "welcome"'), '<div>hello &amp; "welcome"');
});


test('entries should work on an array', () => {
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

test('entries should work on an object', () => {
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

test('entries should work on an Map', () => {
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


test('filter should work on an array', () => {
    var result = utils.filter([1, 2, 3, 4], (v) => v % 2);
    assert.deepEqual(result, [1, 3]);
});

test('filter should work on an object', () => {
    var result = utils.filter({ a: 1, b: 2, c: 3, d: 4 }, (v) => v % 2);
    assert.deepEqual(result, { a: 1, c: 3 });
});

test('find should find an element in an array', () => {
    var result = utils.find([ { v: 1, ok: false }, { v: 2, ok: true }, { v: 3, ok: true }], (v) => v.ok);
    expect(result.v, 2);
});

test('find should find an element in an object', () => {
    var result = utils.find({
        a: { v: 1, ok: false },
        b: { v: 2, ok: true },
        c: { v: 3, ok: true }
    }, (v) => v.ok);
    expect(result.v, 2);
});

test('findIndex should find the index of an element in an array', () => {
    var result = utils.findIndex([ { v: 1, ok: false }, { v: 2, ok: true }, { v: 3, ok: true }], (v) => v.ok);
    expect(result, 1);
});

test('findIndex should find the index of an element in an object', () => {
    var result = utils.findIndex({
        a: { v: 1, ok: false },
        b: { v: 2, ok: true },
        c: { v: 3, ok: true }
    }, (v) => v.ok);
    expect(result, 'b');
});


test('findEach should call the callback for each elements in an array', () => {
    var results = [];
    utils.forEach([ 1, 2, 3 ], (v, i) => results.push([ i, v ]));
    assert.deepEqual(results, [ [0, 1], [1, 2], [2, 3] ]);
});

test('findEach should call the callback for each elements in an object', () => {
    var results = [];
    utils.forEach({ a: 1, b: 2, c: 3 }, (v, key) => results.push([ key, v ]));
    assert.deepEqual(results, [ ['a', 1], ['b', 2], ['c', 3] ]);
});

test('findEach should call the callback for each elements in an Map', () => {
    var results = [];
    utils.forEach(new Map([['a', 12], ['b', 24 ]]), (v, key) => results.push([ key, v ]));
    assert.deepEqual(results, [ ['a', 12], ['b', 24] ]);
});

test('join should joins all elements of an Array into a string', () => {
    var result = utils.join([ 1, 2, 3 ], '-');
    expect(result, '1-2-3');
});

test('join should joins all elements of an Object into a string', () => {
    var result = utils.join({ a: 1, b: 2, c: 3 }, '-');
    expect(result, '1-2-3');
});

test('map should transform all elements of an Array into a new array', () => {
    var result = utils.map([ 1, 2, 3 ], (v) => v * 2);
    assert.deepEqual(result, [2, 4, 6]);
});

test('map should transform all elements of an Object into a new array', () => {
    var result = utils.map({ a: 1, b: 2, c: 3 }, (v) => v * 2);
    assert.deepEqual(result, { a: 2, b: 4, c: 6 });
});

test('reduce should reduce all elements of an Array into a new one', () => {
    var result = utils.reduce([ 1, 2, 3 ], (previous, v, i) => previous + v, 5);
    expect(result, 5 + 1 + 2 + 3);
    result = utils.reduce([ 1, 2, 3 ], (previous, v, i) => previous += i + '_' + v + ',', '');
    expect(result, '0_1,1_2,2_3,');
});

test('reduce should reduce all elements of an Object into a new one', () => {
    var result = utils.reduce({ a: 1, b: 2, c: 3 }, (previous, v, key) => previous + v, 5);
    expect(result, 5 + 1 + 2 + 3);
    result = utils.reduce({ a: 1, b: 2, c: 3 }, (previous, v, i) => previous += i + '_' + v + ',', '');
    expect(result, 'a_1,b_2,c_3,');
});

test('reduceRight should reduce all elements from the right of an Array into a new one', () => {
    var result = utils.reduceRight([ 1, 2, 3 ], (previous, v, i) => previous + v, 5);
    expect(result, 5 + 1 + 2 + 3);
    result = utils.reduceRight([ 1, 2, 3 ], (previous, v, i) => previous += i + '_' + v + ',', '');
    expect(result, '2_3,1_2,0_1,');
});

test('reduceRight should reduce all elements from the right of an Object into a new one', () => {
    var result = utils.reduceRight({ a: 1, b: 2, c: 3 }, (previous, v, key) => previous + v, 5);
    expect(result, 5 + 1 + 2 + 3);
    result = utils.reduceRight({ a: 1, b: 2, c: 3 }, (previous, v, i) => previous += i + '_' + v + ',', '');
    expect(result, 'c_3,b_2,a_1,');
});


test('some should forEach elements of an Array until the callback returns true', () => {
    var results = [];
    var result = utils.some([ 1, 2, 3 ], (v, i) => { results.push(v); return v === 2; }, 5);
    expect(result, true);
    assert.deepEqual(results, [1, 2]);
});

test('some should forEach elements of an Object until the callback returns true', () => {
    var results = {};
    var result = utils.some({ a: 1, b: 2, c: 3 }, (v, key) => { results[key] = v; return v === 2; }, 5);
    expect(result, true);
    assert.deepEqual(results, { a: 1, b: 2 });
});

test('map to array should transform a map into an array', () => {
    var map = new Map();
    map.set('a', 1);
    map.set('ab', 2);
    var result = utils.mapToArray(map, (v, k) => k + ':' + v);
    assert.isArray(result);
    assert.deepEqual(result, ['a:1', 'ab:2']);
});

test('map to array should transform a object into an array', () => {
    var object = { a: 1, ab: 2 };
    var result = utils.mapToArray(object, (v, k) => k + ':' + v);
    assert.isArray(result);
    assert.deepEqual(result, ['a:1', 'ab:2']);
});

test('map to array should transform an array into another array', () => {
    var object = [1, 2];
    var result = utils.mapToArray(object, (v, k) => k + ':' + v);
    assert.isArray(result);
    assert.deepEqual(result, ['0:1', '1:2']);
});

test('defineProperty should work', () => {
    var o = {};
    var res = utils.defineProperty(o, 'a', 1);
    expect(res, o);
    expect(res.a, 1);
});

test('defineConstant should work', () => {
    var o = {};
    var res = utils.defineConstant(o, 'a', 1);
    expect(res, o);
    expect(res.a, 1);

    assert.throws(function() {
        utils.defineConstant(o, 'a', 2);
    }, 'Cannot redefine property: a');
});

test('defineGetter should work', () => {
    var o = {};
    var res = utils.defineGetter(o, 'a', () => 1);
    expect(res, o);
    expect(res.a, 1);
});

test('defineSetter should work', () => {
    var o = {};
    var value;
    var res = utils.defineSetter(o, 'a', (v) => value = v * 2);
    expect(res, o);
    res.a = 2;
    expect(value, 4);
});

test('defineProperties should work', () => {
    var o = {};
    var res = utils.defineProperties(o, {
        a: 1,
        b: 2
    });
    expect(res, o);
    expect(res.a, 1);
    expect(res.b, 2);
});

test('defineProperties should work when properties are empty', () => {
    var o = {};
    var res = utils.defineProperties(o);
    expect(res, o);
});
