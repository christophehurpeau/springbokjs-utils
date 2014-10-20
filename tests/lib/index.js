"use strict";
var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';
var utils = require(lib + 'index');
test('toInt should return a Number', function() {
  expect(utils.toInt('10'), 10);
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
test('escape should return an escaped html string', function() {
  expect(utils.escape('<div>hello & "welcome"'), '&lt;div&gt;hello &amp; &quot;welcome&quot;');
});
test('escapeUrl should return an escaped url string', function() {
  expect(utils.escapeUrl('<div>hello & "welcome"'), '<div>hello &amp; "welcome"');
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