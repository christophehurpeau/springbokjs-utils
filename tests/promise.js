'use strict';
var promiseUtils = require('../promise');

var assert = require('proclaim');
var expect = assert.strictEqual;


function asyncDouble(num, cb) {
    setTimeout(cb.bind(null, null, num * 2), 20);
}

test('promise creator', function() {
    var creator = promiseUtils.creator();
    asyncDouble(2, creator.done);
    return creator.promise
        .then(function(result) {
            expect(result, 4);
        });
});

test('parallel with no array', function() {
    var p = promiseUtils.parallel();
    asyncDouble(1, p.done());
    asyncDouble(2, p.done());
    return p.promise
        .then(function(results) {
            assert.deepEqual(results, [2, 4]);
        });
});


test('parallel with array containing all callbacks', function() {
    var p = promiseUtils.parallel([
        new Promise(function(resolve) {
            resolve(1);
        }),
        undefined,
        3,
        undefined
    ]);
    asyncDouble(1, p.done());
    asyncDouble(2, p.done());
    return p.promise
        .then(function(results) {
            assert.deepEqual(results, [1, 2, 3, 4]);
        });
});


test('parallel with array not containing all callbacks', function() {
    var p = promiseUtils.parallel([
        1,
        undefined,
        3
    ]);
    asyncDouble(1, p.done());
    asyncDouble(2, p.done());
    asyncDouble(3, p.done());
    return p.promise
        .then(function(results) {
            assert.deepEqual(results, [1, 2, 3, 4, 6]);
        });
});
