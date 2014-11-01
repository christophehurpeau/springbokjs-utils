/* global test */
var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

var arrayUtils = require(lib + 'array');

test('slice1: slicing an empty array should return an empty array', () => {
    assert.deepEqual(arrayUtils.slice1([]), []);
});

test('slice1: slicing an empty array should return an array without the first value', () => {
    assert.deepEqual(arrayUtils.slice1([1, 2, 3]), [2, 3]);
});

test('slice1: slicing an array-like object should return an array without the first value', () => {
    assert.deepEqual(arrayUtils.slice1({ length: 3, 0: 1, 1: 2, 2: 3 }), [2, 3]);
});

test('has', () => {
    expect(arrayUtils.has([1, 2, 3], 4), false);
    expect(arrayUtils.has([1, 2, 3], 2), true);
});

test('hasAmong', () => {
    expect(arrayUtils.hasAmong([1, 2, 3], [4]), false);
    expect(arrayUtils.hasAmong([1, 2, 3], [2, 4, 6]), true);
    expect(arrayUtils.hasAmong([1, 2, 3], [4, 2]), true);
});

test('hasAmong', () => {
    expect(arrayUtils.hasAmong([1, 2, 3], [4]), false);
    expect(arrayUtils.hasAmong([1, 2, 3], [2, 4, 6]), true);
    expect(arrayUtils.hasAmong([1, 2, 3], [4, 2]), true);
});

test('remove', () => {
    var tab;
    tab = [1, 2, 3];
    expect(arrayUtils.remove(tab, 1), 0);
    assert.deepEqual(tab, [2, 3]);

    tab = [1, 2, 3];
    expect(arrayUtils.remove(tab, 2), 1);
    assert.deepEqual(tab, [1, 3]);

    tab = [1, 2, 3];
    expect(arrayUtils.remove(tab, 3), 2);
    assert.deepEqual(tab, [1, 2]);

    tab = [1, 2, 3];
    expect(arrayUtils.remove(tab, 4), false);
    assert.deepEqual(tab, [1, 2, 3]);
});


test('clone', () => {
    var a = [2, 5];
    var b = arrayUtils.clone(a);
    assert.notStrictEqual(a, b);
    assert.deepEqual(a, b);
});

test('last', () => {
    expect(arrayUtils.last([1]), 1);
    expect(arrayUtils.last([1, 2, 3]), 3);
});

test('sortBy', () => {
    assert.deepEqual(arrayUtils.sortBy([{ a: 2 }, { a: 1 }], 'a'), [{ a: 1 }, { a: 2 }]);
    assert.deepEqual(arrayUtils.sortBy([{ a: 2 }, { a: 1 }, { a: 1 }], 'a', true), [{ a: 2 }, { a: 1 }, { a: 1 }]);

    assert.deepEqual(arrayUtils.sortBy([{ a: 2 }, { a: 1 }], 'a', 'number'), [{ a: 1 }, { a: 2 }]);
    assert.deepEqual(arrayUtils.sortBy([{ a: 2 }, { a: 1 }], 'a', true, 'number'), [{ a: 2 }, { a: 1 }]);

    assert.deepEqual(arrayUtils.sortBy([{ a: 'a' }, { a: 'b' }], 'a', 'string'), [{ a: 'a' }, { a: 'b' }]);
    assert.deepEqual(arrayUtils.sortBy([{ a: 'a' }, { a: 'b' }], 'a', true, 'string'), [{ a: 'b' }, { a: 'a' }]);
});

test('random should return an element in the array', () => {
    var array = [1, 2, 3];
    assert.isTrue(array.indexOf(arrayUtils.random(array)) !== -1);
});


test('sortBy with number should sort', () => {
    assert.deepEqual(
        arrayUtils.sortBy([{ a: 6 }, { a: 3 }, { a: 5 }, { a: 2 }, { a: 4 }, { a: 1 }, { a: 0 }], 'a', 'number'),
        [{ a: 0 }, { a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }, { a: 6 }]
    );
});

test('sortBy with string should sort', () => {
    assert.deepEqual(arrayUtils.sortBy([{ a: 'c' }, { a: 'a' }, { a: 'b' }], 'a', 'string'),
            [{ a: 'a' }, { a: 'b' }, { a: 'c' }]);
});

test('removeWhen should return a new array with elements removed when callback is true', () => {
    var array = [0, 1, 2, 3, 4];
    var newLength = arrayUtils.removeWhen(array, (v) => v % 2);
    expect(newLength, 3);
    assert.deepEqual(array, [0, 2, 4]);
});

test('equals should return true when the same array is used', () => {
    var array = [0, 1, 2];
    assert.isTrue(arrayUtils.equals(array, array));
});

test('equals should return true when the array has the same length and the same values', () => {
    assert.isTrue(arrayUtils.equals([0, 1], [0, 1]));
});

test('equals should return false when the array has not the same length', () => {
    assert.isFalse(arrayUtils.equals([0, 1], [0]));
});

test('equals should return false when the array has not the same values', () => {
    assert.isFalse(arrayUtils.equals([0, 1], [1, 0]));
});

test('equals should return false when the array has not the same strict values', () => {
    assert.isFalse(arrayUtils.equals([0, 1], ['0', 1]));
});
