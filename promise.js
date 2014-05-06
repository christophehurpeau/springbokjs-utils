var S = require('./index');
var promiseUtils = S.newLibrary();
module.exports = promiseUtils;

S.defineProperties(promiseUtils, {
    forEach: function(iterable, callback) {
        return Promise.all(iterable.map(callback));
    },
    callbackToPromise: function(callback) {
        var args = Array.prototype.slice.call(arguments, 1);
        return new Promise(function(resolve, reject) {
            args.push(function(err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
            callback.apply(null, args);
        });
    }
});