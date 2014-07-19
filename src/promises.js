var S = require('./index');
var createdPromise;


/**
 * @exports promises
 */
var promises = {
    /**
     * Returns a callback that resolve or reject the created promise that you can get with {promises}
     *
     * @return {Function} callback(err, result)
     */
    done() {
        var resolveCallback, rejectCallback;
        createdPromise = new Promise(function(resolve, reject) {
            resolveCallback = resolve;
            rejectCallback = reject;
        });
        return promises.resolveFromCallback(resolveCallback, rejectCallback);
    },

    /**
    * Returns the Promise created by the previously called method done()
    *
    * example : promises.promise(callback(promises.done()));
    *
    * @return {Promise}
    */
    promise() {
        if (!createdPromise) {
            throw new Error('No promise in stack, done() should be called before');
        }
        var p = createdPromise;
        createdPromise = undefined;
        return p;
    },

    /**
     * Execute promises in parallel
     *
     * @param {Array|Object} iterable an iterable with .map method (like Array), or an key/value object
     * @param {Function} callback callback(value, index) called for each values
     * @return {Promise}
     */
    forEach(iterable, callback) {
        if (Array.isArray(iterable)) {
            return Promise.all(iterable.map(callback));
        }
        var keys = [], values = [];
        S.forEach(S.map(iterable, callback), function(value, index) {
            keys.push(index);
            values.push(value);
        });

        return Promise.all(values).then((results) => {
            return S.map(iterable, function(value, index) {
                return results[keys.indexOf(index)];
            });
        });
    },

    /**
     * Execute promises in series
     *
     * @param {Array|Object} iterable an iterable with .map method (like Array), or an key/value object
     * @param {Function} callback callback(value, index) called for each values
     * @return {Promise}
     */
    forEachSeries(iterable, callback) {
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

    /**
     * Execute the second callback wile the first callback is true
     *
     * @param {Function} iterable an iterable with .map method (like Array), or an key/value object
     * @param {Function} callback callback(value, index) called for each values
     * @return {Promise}
     */
    whileTrue(conditionCallback, callback) {
        return new Promise(function(resolve, reject) {
            (function next() {
                if (!conditionCallback()) {
                    resolve();
                }
                var result = callback();
                if (result instanceof Promise) {
                    result
                        .then(function() {
                            setImmediate(next);
                        })
                        .catch(reject);
                } else {
                    setImmediate(next);
                }
            })();
        });
    },

    /**
     * Creates a callback that resolve or reject a promise
     * according to the default callback convention in node: (err, result)
     *
     * @param {Function} resolve resolve function of the promise
     * @param {Function} reject reject function of the promise
     * @return {Function}
     */
    resolveFromCallback(resolve, reject) {
        return function(err, result) {
            if (err) {
                return reject(err);
            }
            resolve(result);
        };
    }
};

module.exports = promises;