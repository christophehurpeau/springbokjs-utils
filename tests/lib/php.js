/* global test */
"use strict";
var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

var php = require(lib + 'php');



test('exportCode should work with null, false, true', function() {
    expect(php.exportCode(null), 'null');
    expect(php.exportCode(false), 'false');
    expect(php.exportCode(true), 'true');
});

test('exportCode should work with an array of numbers', function() {
    expect(php.exportCode([0, 1, 0.5]), 'array(0,1,0.5)');
});

test('exportCode should string', function() {
    expect(php.exportCode('test'), '\'test\'');
});

test('exportCode should string containing a single quote', function() {
    expect(php.exportCode('test\''), '\"test\'\"');
});

test('exportCode should work with an array of strings', function() {
    expect(php.exportCode(['test\'', 'test"']), 'array(\"test\'\",\'test"\')');
});

//# sourceMappingURL=php.js.map