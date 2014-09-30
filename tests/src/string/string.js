/* global test */
var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

var stringUtils = require(lib + 'string/string');

test('lcFirst should transform the first letter in a lowercase letter', function() {
    expect(stringUtils.lcFirst('Aaaa'), 'aaaa');
    expect(stringUtils.lcFirst('AAaa'), 'aAaa');
    expect(stringUtils.lcFirst('AAAA'), 'aAAA');
    expect(stringUtils.lcFirst('aaAA'), 'aaAA');
    expect(stringUtils.lcFirst('ZaAA'), 'zaAA');
});

test('ucFirst should transform the first letter in a uppercase letter', function() {
    expect(stringUtils.ucFirst('aaaa'), 'Aaaa');
    expect(stringUtils.ucFirst('aAaa'), 'AAaa');
    expect(stringUtils.ucFirst('aAAA'), 'AAAA');
    expect(stringUtils.ucFirst('AaAA'), 'AaAA');
    expect(stringUtils.ucFirst('zaAA'), 'ZaAA');
});

test('isEmpty should test if a string is empty', function() {
    expect(stringUtils.isEmpty('aaaa'), false);
    expect(stringUtils.isEmpty(''), true);
    expect(stringUtils.isEmpty('  '), true);
    expect(stringUtils.isEmpty('\n'), true);
});

test('format should format a string', function() {
    expect(stringUtils.format('aaaa%sbbb', 'test'), 'aaaatestbbb');
    expect(stringUtils.format('aaaa%sbbb%s%s', 'test'), 'aaaatestbbb');
});

test('vformat should format a string', function() {
    expect(stringUtils.vformat('aaaa%sbbb', ['test']), 'aaaatestbbb');
    expect(stringUtils.vformat('aaaa%sbbb%s%s', ['test']), 'aaaatestbbb');
});
