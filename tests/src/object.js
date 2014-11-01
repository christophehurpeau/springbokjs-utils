/* global test */
var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

var objectUtils = require(lib + 'object');

test('toMap transforms an object into a Map', () => {
    var object = { a: 1, b: 2 };
    var map = objectUtils.toMap(object);
    expect(map.size, 2);
    expect(map.get('a'), 1);
    expect(map.get('b'), 2);
});

test('toMap handles Map as argument', () => {
    var map = new Map();
    var result = objectUtils.toMap(map);
    expect(map, result);
});

test('union merge several objects into one, ignoring undefined args, only if the property doesn\'t exists yet', () => {
    var object = objectUtils.union({ a: 1 }, { b: 2 }, undefined, null, { c: 3 }, { c: 4 });
    expect(object.a, 1);
    expect(object.b, 2);
    expect(object.c, 3);
});

test('clone clones an object', () => {
    var o = { a: 1, b: 2 };
    var cloned = objectUtils.clone(o);
    expect(o.a, cloned.a);
    expect(o.b, cloned.b);
    cloned.c = true;
    expect(cloned.c, true);
    expect(o.c, undefined);
});

test('filterKeys creates an new object', () => {
    var o = { a: 1, b: 2, c: 3 };
    var filtered = objectUtils.filterKeys(o, ['b', 'c']);
    expect(filtered.a, undefined);
    expect(o.b, filtered.b);
    expect(o.c, filtered.c);
});

test('mapJoin should work', () => {
    var result = objectUtils.mapJoin({ a: 1, b: 2 }, '_', (v, k) => k + '-' + v);
    expect(result, 'a-1_b-2');
});

test('mapJoin should work with only two arguments', () => {
    var result = objectUtils.mapJoin({ a: 1, b: 2 }, (v, k) => k + '-' + v);
    expect(result, 'a-1b-2');
});
