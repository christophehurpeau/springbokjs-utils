/* global test */
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


test('exportCode should work with an object', function() {
    expect(php.exportCode({ a: 0, b: 1, test: 'test' }), "array('a'=>0,'b'=>1,'test'=>'test')");
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

test('exportString works with new lines', function() {
    expect(php.exportString('test\n'), '\"test\n\"');
});

test('exportString works with new \\t', function() {
    expect(php.exportString('test\t'), '\"test\t\"');
});

test('exportString works with string containing quotes and simple quotes', function() {
    expect(php.exportString('test\'\"'), '\'test\\\'\"\'');
});
