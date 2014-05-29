var S = require('./index');
var promiseUtils = S.newLibrary();

module.exports = promiseUtils;

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
            })
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
        }
    },
    forEach: function(iterable, callback) {
        return Promise.all(S.map(iterable, callback));
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