var S = require('./index');
var promiseUtils = S.newLibrary();

module.exports = promiseUtils;

var createdPromise;
S.defineProperties(promiseUtils, {
    creator: function() {
        var resolveCallback, rejectCallback;
        return {
            promise: new Promise(function(resolve, reject) {
                resolveCallback = resolve;
                rejectCallback = reject;
            }),
            done: promiseUtils.resolveFromCallback(resolveCallback, rejectCallback)
        };
    },
    done: function() {
        var resolveCallback, rejectCallback;
        createdPromise = new Promise(function(resolve, reject) {
            resolveCallback = resolve;
            rejectCallback = reject;
        });
        return promiseUtils.resolveFromCallback(resolveCallback, rejectCallback);
    },
    /**
     * Returns the Promise created by the previously called method done()
     * @return {Promise}
     *
     * example : promiseUtils.promise(callback(promiseUtils.done()));
     */
    promise: function() {
        if (!createdPromise) {
            throw new Error('No promise in stack, done() should be called before');
        }
        var p = createdPromise;
        createdPromise = undefined;
        return p;
    },

    parallel: function(array) {
        var pending = 0, nextIndex = 0;
        var results = [];
        var resultsCallbacksIndexes = [];

        var arrayLength = array && array.length || 0;
        if (array) {
            array.forEach(function(value, index) {
                if (value === undefined) {
                    resultsCallbacksIndexes.push(index);
                } else if (value instanceof Promise) {
                    pending++;
                    value
                        .then(function(result) {
                            results[index] = result;
                            if (--pending === 0) {
                                resolveCallback(results);
                            }
                        })
                        .catch(function(err) {
                            rejectCallback(err);
                        });
                } else {
                    results[index] = value;
                }
            });
        }

        var resolveCallback, rejectCallback;
        return {
            promise: new Promise(function(resolve, reject) {
                resolveCallback = resolve;
                rejectCallback = reject;
            }),
            done: function() {
                var index = nextIndex++;
                pending++;
                return function(err, result) {
                    if (err) {
                        return rejectCallback(err);
                    }
                    if (resultsCallbacksIndexes.length <= index) {
                        results[arrayLength - resultsCallbacksIndexes.length + index] = result;
                    } else {
                        var indexResults = resultsCallbacksIndexes[index];
                        results[indexResults] = result;
                    }
                    if (--pending === 0) {
                        resolveCallback(results);
                    }
                };
            }
        };
    },
    forEach: function(iterable, callback) {
        return Promise.all(S.map(iterable, callback));
    },
    forEachSeries: function(iterable, callback) {
        return new Promise(function(resolve, reject) {
            var entriesIterator = iterable.entries();
            var results = new iterable.constructor();
            var next = function() {
                var current = entriesIterator.next();
                if (current.done) {
                    return resolve(results);
                }
                var key = current.value[0], value = current.value[1];
                var result = callback(value, key);
                if (result instanceof Promise) {
                    result
                        .then(function(result) {
                            results[key] = result;
                            next();
                        })
                        .catch(reject);
                } else {
                    results[key] = result;
                    setImmediate(next);
                }
            };
            next();
        });
    },
    callbackToPromise: function(callback) {
        var args = Array.prototype.slice.call(arguments, 1);
        return new Promise(function(resolve, reject) {
            args.push(promiseUtils.resolveFromCallback(resolve, reject));
            callback.apply(null, args);
        });
    },
    resolveFromCallback: function(resolve, reject) {
        return function(err, result) {
            if (err) {
                return reject(err);
            }
            resolve(result);
        };
    }
});