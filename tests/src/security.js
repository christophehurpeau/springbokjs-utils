/* global test */
var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

var security = require(lib + 'security.js');

test('it should create a md5 base64 hash', function() {
    expect(security.md5('test'), 'CY9rzUYh03PK3k6DJie09g==');
});

test('it should create a sha1 base64 hash', function() {
    expect(security.sha1('test'), 'qUqP5cyxm6YcTAhz05Hph5gvu9M=');
});

test('it should create a sha512 base64 hash', function() {
    expect(security.sha512('test'),
        '7iaw3Ur350mqGo7jwQrpkj9hiYB3Lkc/iBml1JQODbJ6wYX4oOHV+E+IvIh/1nsUNzLDBMxfqa2Ob1f1ACio/w==');
});

test('it should tests all methods in security', function() {
    assert.deepEqual(Object.keys(security), ['md5', 'sha1', 'sha512']);
});