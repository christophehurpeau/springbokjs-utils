var S = require('./index');
var promiseUtils = S.newLibrary();
module.exports = promiseUtils;

S.defineProperties(promiseUtils, {
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