/* global test */
var assert = require('proclaim');
var expect = assert.strictEqual;
var lib = '../../lib' + (process.env.TEST_COV && '-cov' || '') + '/';

var promises = require(lib + 'promises');



test('it should failed because done() should be called before promise()', function() {
    assert.throws(promises.promise, 'No promise in stack, done() should be called before');
});

test('done() and promise() should work', function() {
    var callback = promises.done();
    assert.isFunction(callback);
    var promise = promises.promise();
    assert.isInstanceOf(promise, Promise);

    promise = promise.then((result) => {
        expect(result, 20);
    });

    callback(null, 20); // resolve promise

    return promise;
});


test('done() and promise() should work when there is an error', function() {
    var callback = promises.done();
    assert.isFunction(callback);
    var promise = promises.promise();
    assert.isInstanceOf(promise, Promise);
    promise = promise
        .then(() => {
            assert.notOk(true, 'This should never be called');
        })
        .catch((err) => {
            expect(err, 'test error');
        });

    callback('test error');

    return promise;
});


test('forEach() with an array with one value', function() {
    var promise = promises.forEach([
        new Promise((resolve) => resolve('ok'))
    ], (value) => value);
    return promise
        .then((result) => {
            assert.deepEqual(result, ['ok']);
        });
});


test('forEach() with an array with several values', function() {
    var promise = promises.forEach([
        'ok',
        'test2',
        new Promise((resolve) => resolve('ok3')),
    ], (value) => {
        if (value === 'ok') {
            return new Promise((resolve) => resolve('ok1'));
        }
        return value;
    });
    return promise
        .then((result) => {
            assert.deepEqual(result, ['ok1', 'test2', 'ok3']);
        });
});

test('forEach() with an object with several values', function() {
    var promise = promises.forEach({
        value1: new Promise((resolve) => resolve('ok')),
        value2: 'test2',
        value3: new Promise((resolve) => {
            setTimeout(function() {
                resolve(4);
            }, 20);
        })
    }, (value) => value);
    return promise
        .then((result) => {
            assert.deepEqual(result, { value1: 'ok', value2: 'test2', value3: 4 });
        });
});


test('forEach() fails', function() {
    var promise = promises.forEach(['test1', 'test2'], () => {
        return new Promise((resolve, reject) => {
            reject('test error');
        });
    });
    return promise
        .then(() => {
            assert.notOk(true, 'This should never be called');
        })
        .catch((err) => {
            expect(err, 'test error');
        });
});

test('forEach() fails asynchronously', function() {
    var promise = promises.forEach([
        'test1',
        new Promise((resolve, reject) => {
            setTimeout(function() {
                reject('test error');
            }, 20);
        })
    ], (value) => value);
    return promise
        .then(() => {
            assert.notOk(true, 'This should never be called');
        })
        .catch((err) => {
            expect(err, 'test error');
        });
});


test('forEachSeries() with an array with one value', function() {
    var promise = promises.forEachSeries([
        new Promise((resolve) => resolve('ok'))
    ], (value) => value);
    return promise
        .then((result) => {
            assert.deepEqual(result, ['ok']);
        });
});

test('forEachSeries() with an array with several values', function() {
    var promise = promises.forEachSeries([
        'ok',
        'test2',
        new Promise((resolve) => resolve('ok3')),
    ], (value) => {
        if (value === 'ok') {
            return new Promise((resolve) => resolve('ok1'));
        }
        return value;
    });
    return promise
        .then((result) => {
            assert.deepEqual(result, ['ok1', 'test2', 'ok3']);
        });
});

test('whileTrue() with an array with several values', function() {
    var iterator = [
        'ok',
        'test2',
        new Promise((resolve) => resolve('ok3')),
    ].entries();
    var current, results = [];
    var promise = promises.whileTrue(() => {
        current = iterator.next();
        return !current.done;
    }, () => {
        if (current.value[1] instanceof Promise) {
            return current.value[1].then((result) => results.push(result));
        }
        results.push(current.value[1]);
    });
    return promise
        .then(() => {
            assert.deepEqual(results, ['ok', 'test2', 'ok3']);
        });
});



test('creator() should work', function() {
    var [promise, callback] = promises.creator();
    assert.isFunction(callback);
    assert.isInstanceOf(promise, Promise);

    promise = promise.then((result) => {
        expect(result, 20);
    });

    callback(null, 20); // resolve promise

    return promise;
});


test('promiseCallback() should work', function() {
    var promise = promises.promiseCallback((done) => {
        assert.isFunction(done);

        done(null, 20); // resolve promise
    });
    assert.isInstanceOf(promise, Promise);

    promise = promise.then((result) => {
        expect(result, 20);
    });

    return promise;
});
