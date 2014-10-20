/* jshint maxlen: 200 */
/* global test */

"use strict";

var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

var fs = require(lib + 'fs');

test('read existant file', function() {
    return fs.readFile('./AUTHORS')
        .then(function(value) {
            expect(value.toString().trim(), 'Christophe Hurpeau <christophe@hurpeau.com> (http://christophe.hurpeau.com/)');
        }, function(error) {
            assert.ok(false, error);
        });
});


test('read unexistant file', function() {
    return fs.readFile('./unexistant')
        .then(function(value) {
            assert.ok(false, value);
        }, function(error) {
            expect(error.message, "ENOENT, open './unexistant'");
        });
});

//# sourceMappingURL=fs.js.map