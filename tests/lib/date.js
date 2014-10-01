"use strict";
var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';
var dateUtils = require(lib + 'date');
test('isLeapYear', function() {
  assert.isFalse(dateUtils.isLeapYear(2010));
  assert.isFalse(dateUtils.isLeapYear(2011));
  assert.isTrue(dateUtils.isLeapYear(2012));
  assert.isFalse(dateUtils.isLeapYear(2013));
  assert.isFalse(dateUtils.isLeapYear(2014));
});
test('daysInMonth', function() {
  expect(dateUtils.daysInMonth(0, 2014), 31);
  expect(dateUtils.daysInMonth(1, 2014), 28);
  expect(dateUtils.daysInMonth(1, 2012), 29);
  expect(dateUtils.daysInMonth(2, 2014), 31);
  expect(dateUtils.daysInMonth(3, 2014), 30);
  expect(dateUtils.daysInMonth(4, 2014), 31);
  expect(dateUtils.daysInMonth(5, 2014), 30);
  expect(dateUtils.daysInMonth(6, 2014), 31);
  expect(dateUtils.daysInMonth(7, 2014), 31);
  expect(dateUtils.daysInMonth(8, 2014), 30);
  expect(dateUtils.daysInMonth(9, 2014), 31);
  expect(dateUtils.daysInMonth(10, 2014), 30);
  expect(dateUtils.daysInMonth(11, 2014), 31);
});
test('toSqlDate', function() {
  var date = new Date(2014, 0, 1, 8, 1, 1, 100);
  expect(dateUtils.toSqlDate(date), '2014-01-01 08:01:01');
  expect(dateUtils.toSqlDate(date, false), '2014-01-01');
  date = new Date(2014, 10, 22, 15, 54, 34, 100);
  expect(dateUtils.toSqlDate(date), '2014-11-22 15:54:34');
  expect(dateUtils.toSqlDate(date, false), '2014-11-22');
});
test('parseSqlDate', function() {
  var parsedDate = dateUtils.parseSqlDate('2014-01-01 08:01:01');
  expect(parsedDate.getFullYear(), 2014);
  expect(parsedDate.getMonth(), 0);
  expect(parsedDate.getDate(), 1);
  expect(parsedDate.getHours(), 8);
  expect(parsedDate.getMinutes(), 1);
  expect(parsedDate.getSeconds(), 1);
  parsedDate = dateUtils.parseSqlDate('2014-01-01');
  expect(parsedDate.getFullYear(), 2014);
  expect(parsedDate.getMonth(), 0);
  expect(parsedDate.getDate(), 1);
  expect(parsedDate.getHours(), 0);
  expect(parsedDate.getMinutes(), 0);
  expect(parsedDate.getSeconds(), 0);
  parsedDate = dateUtils.parseSqlDate('2014-11-22 15:54:34');
  expect(parsedDate.getFullYear(), 2014);
  expect(parsedDate.getMonth(), 10);
  expect(parsedDate.getDate(), 22);
  expect(parsedDate.getHours(), 15);
  expect(parsedDate.getMinutes(), 54);
  expect(parsedDate.getSeconds(), 34);
  parsedDate = dateUtils.parseSqlDate('2014-11-22');
  expect(parsedDate.getFullYear(), 2014);
  expect(parsedDate.getMonth(), 10);
  expect(parsedDate.getDate(), 22);
  expect(parsedDate.getHours(), 0);
  expect(parsedDate.getMinutes(), 0);
  expect(parsedDate.getSeconds(), 0);
});

//# sourceMappingURL=date.js.map