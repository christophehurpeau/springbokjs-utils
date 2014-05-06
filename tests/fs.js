'use strict';
var fs = require('../fs');

var assert = require('proclaim');
var expect = assert.strictEqual;


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