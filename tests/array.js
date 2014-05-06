'use strict';
var arrayUtils = require('../array.js');

var assert = require('proclaim');
var expect = assert.strictEqual;
var expectDeepEqual = assert.deepEqual;


test('slice1', function() {
    expectDeepEqual(arrayUtils.slice1([1,2,3]), [2,3]);
});

test('has', function() {
    expect(arrayUtils.has([1,2,3],4),false);
    expect(arrayUtils.has([1,2,3],2),true);
});

test('hasAmong', function() {
    expect(arrayUtils.hasAmong([1,2,3],[4]),false);
    expect(arrayUtils.hasAmong([1,2,3],[2,4,6]),true);
    expect(arrayUtils.hasAmong([1,2,3],[4,2]),true);
});

test('hasAmong', function() {
    expect(arrayUtils.hasAmong([1,2,3],[4]), false);
    expect(arrayUtils.hasAmong([1,2,3],[2,4,6]), true);
    expect(arrayUtils.hasAmong([1,2,3],[4,2]), true);
});

test('remove', function() {
    var tab;
    tab = [1,2,3];
    expect(arrayUtils.remove(tab, 1), 0);
    expectDeepEqual(tab, [2,3]);

    tab = [1,2,3];
    expect(arrayUtils.remove(tab, 2), 1);
    expectDeepEqual(tab, [1,3]);

    tab = [1,2,3];
    expect(arrayUtils.remove(tab, 3), 2);
    expectDeepEqual(tab, [1,2]);

    tab = [1,2,3];
    expect(arrayUtils.remove(tab, 4), false);
    expectDeepEqual(tab, [1,2,3]);
});

test('last', function() {
    expect(arrayUtils.last([1]),1);
    expect(arrayUtils.last([1,2,3]),3);
});

test('sortBy', function() {
    expectDeepEqual(arrayUtils.sortBy([{a:2},{a:1}],'a','number'), [{a:1},{a:2}]);
    expectDeepEqual(arrayUtils.sortBy([{a:2},{a:1}],'a',true,'number'), [{a:2},{a:1}]);
    
    expectDeepEqual(arrayUtils.sortBy([{a:'a'},{a:'b'}],'a','string'), [{a:'a'},{a:'b'}]);
    expectDeepEqual(arrayUtils.sortBy([{a:'a'},{a:'b'}],'a',true,'string'), [{a:'b'},{a:'a'}]);
});

test('findBy', function() {
    expectDeepEqual(arrayUtils.findBy([{a:2},{a:1}],'a',2),{a:2});
    expect(arrayUtils.findBy([{a:2},{a:1}],'a',3), false);
    expectDeepEqual(arrayUtils.findBy([{a:2},{a:1}],'a',1),{a:1});
});

test('findKeyBy', function() {
    expectDeepEqual(arrayUtils.findKeyBy([{a:2},{a:1}],'a',2),0);
    expect(arrayUtils.findKeyBy([{a:2},{a:1}],'a',3), false);
    expectDeepEqual(arrayUtils.findKeyBy([{a:2},{a:1}],'a',1),1);
});
