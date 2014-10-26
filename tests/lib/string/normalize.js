/* global test */
"use strict";
var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

require(lib + 'string/normalize');
var stringUtils = require(lib + 'string/string');


test('translit should transliterate a string', function() {
    expect(stringUtils.translit('ah ah ééé !'), 'ah ah eee !');
});

test('normalize should normalize a string', function() {
    expect(stringUtils.normalize('aAaa ééé !'), 'aaaa eee');
});

test('slugify should create a slug from a string', function() {
    expect(stringUtils.slugify('ah_ah ééé !'), 'ah-ah-eee');
    expect(stringUtils.slugify('ah ah ééé !', '+'), 'ah+ah+eee');
});

//# sourceMappingURL=../string/normalize.js.map