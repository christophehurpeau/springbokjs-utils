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

test('read json file', function() {
    return fs.readJsonFile('./package.json')
        .then(function(value) {
            expect(value.name, 'springbokjs-utils');
        }, function(error) {
            assert.ok(false, error);
        });
});

test('read json file synchronously', function() {
    var value = fs.readJsonFileSync('./package.json');
    expect(value.name, 'springbokjs-utils');
    return value;
});

test('write json file', function() {
    return fs.writeJsonFile('./_temp_file_json.yml', { name: 'springbokjs-utils' })
        .then(function() {
            return fs.readJsonFile('./_temp_file_json.yml');
        }).then(function(value) {
            expect(value.name, 'springbokjs-utils');
            return fs.unlink('./_temp_file_json.yml');
        });
});

test('write pretty json file', function() {
    return fs.writePrettyJsonFile('./_temp_file_json.yml', { name: 'springbokjs-utils' })
        .then(function() {
            return fs.readJsonFile('./_temp_file_json.yml');
        }).then(function(value) {
            expect(value.name, 'springbokjs-utils');
            return fs.unlink('./_temp_file_json.yml');
        });
});

test('read yaml file', function() {
    return fs.writeFile('./_temp_file_yaml.yml', 'name: springbokjs-utils')
        .then(function() {
            return fs.readYamlFile('./_temp_file_yaml.yml');
        }).then(function(value) {
            expect(value.name, 'springbokjs-utils');
            return fs.unlink('./_temp_file_yaml.yml');
        });
});

test('read yaml file synchronously', function() {
    return fs.writeFile('./_temp_file_yaml.yml', 'name: springbokjs-utils')
        .then(function() {
            var value = fs.readYamlFileSync('./package.json');
            expect(value.name, 'springbokjs-utils');
            return fs.unlink('./_temp_file_yaml.yml');
        });
});

test('write yaml file', function() {
    return fs.writeYamlFile('./_temp_file_yaml.yml', { name: 'springbokjs-utils' })
        .then(function() {
            return fs.readYamlFile('./_temp_file_yaml.yml');
        }).then(function(value) {
            expect(value.name, 'springbokjs-utils');
            return fs.unlink('./_temp_file_yaml.yml');
        });
});

//# sourceMappingURL=fs.js.map