/* global test */

var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

var fs = require(lib + 'fs');

test('read existant file', function() {
    return fs.readFile('./AUTHORS')
        .then(function(value) {
            expect(
                value.toString().trim(),
                'Christophe Hurpeau <christophe@hurpeau.com> (http://christophe.hurpeau.com/)'
            );
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
        .then(() => {
            return fs.readJsonFile('./_temp_file_json.yml');
        }).then((value) => {
            expect(value.name, 'springbokjs-utils');
            return fs.unlink('./_temp_file_json.yml');
        });
});

test('write pretty json file', function() {
    return fs.writePrettyJsonFile('./_temp_file_json.yml', { name: 'springbokjs-utils' })
        .then(() => {
            return fs.readJsonFile('./_temp_file_json.yml');
        }).then((value) => {
            expect(value.name, 'springbokjs-utils');
            return fs.unlink('./_temp_file_json.yml');
        });
});

test('read yaml file', function() {
    return fs.writeFile('./_temp_file_yaml.yml', 'name: springbokjs-utils')
        .then(() => {
            return fs.readYamlFile('./_temp_file_yaml.yml');
        }).then((value) => {
            expect(value.name, 'springbokjs-utils');
            return fs.unlink('./_temp_file_yaml.yml');
        });
});

test('read yaml file synchronously', function() {
    return fs.writeFile('./_temp_file_yaml.yml', 'name: springbokjs-utils')
        .then(() => {
            var value = fs.readYamlFileSync('./package.json');
            expect(value.name, 'springbokjs-utils');
            return fs.unlink('./_temp_file_yaml.yml');
        });
});

test('write yaml file', function() {
    return fs.writeYamlFile('./_temp_file_yaml.yml', { name: 'springbokjs-utils' })
        .then(() => {
            return fs.readYamlFile('./_temp_file_yaml.yml');
        }).then((value) => {
            expect(value.name, 'springbokjs-utils');
            return fs.unlink('./_temp_file_yaml.yml');
        });
});

test('readRecursiveDirectory files', function() {
    var files = [];
    return fs.readRecursiveDirectory(
            './tests/src',
            { recursive: false, directories: false },
            (file) => files.push(file.filename)
        ).then(() => {
            assert.deepEqual(files, [
                '_before.js',
                'array.js',
                'date.js',
                'fs.js',
                'generators.js',
                'index.js',
                'object.js',
                'php.js',
                'promises.js',
                'security.js'
            ]);
        });
});

test('readRecursiveDirectory files recursivly', function() {
    var files = [];
    return fs.readRecursiveDirectory(
            './tests/src',
            { recursive: true, directories: false },
            (file) => files.push(file.filename)
        ).then(() => {
            assert.deepEqual(files, [
                '_before.js',
                'array.js',
                'date.js',
                'fs.js',
                'generators.js',
                'index.js',
                'object.js',
                'php.js',
                'promises.js',
                'security.js',
                'html.js',
                'normalize.js',
                'string.js'
            ]);
        });
});

test('readRecursiveDirectory directories', function() {
    var directories = [];
    return fs.readRecursiveDirectory(
            './tests/src',
            { recursive: false, directories: true },
            (file) => file.dirname && directories.push(file.dirname)
        ).then(() => {
            assert.deepEqual(directories, ['string']);
        });
});
