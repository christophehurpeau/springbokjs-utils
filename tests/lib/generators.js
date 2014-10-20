/* jshint maxlen: 200 */
/* global test */

"use strict";

var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

var generators = require(lib + 'generators');

test('should return a random code', function() {
    var randomCode = generators.randomCode(12);
    expect(randomCode.length, 12);
});

//# sourceMappingURL=generators.js.map