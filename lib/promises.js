"use strict";

var S = require("./index");

var createdPromise;

/**
 * @module promises
 */

/**
 * Creates a callback that resolve or reject a promise
 * according to the default callback convention in node: (err, result)
 *
 * @param {Function} resolve resolve function of the promise
 * @param {Function} reject reject function of the promise
 * @return {Function}
 */
var resolveFromCallback = exports.resolveFromCallback = function (resolve, reject) {
    return function (err, result) {
        if (err) {
            return reject(err);
        }
        resolve(result);
    };
};

/**
 * Returns a promise
 *
 * The first argument is a callback with a done function
 *
 * @example
 * S.promiseCallback((done) => {
 *     fs.readFile('./myFile.txt', done);
 * }).then((txtContentBuffer) => {
 *     console.log(txtContentBuffer.toString());
 * });
 *
 * @param {Function} callback callback((done) => {})
 * @return {Promise}
 */
var promiseCallback = exports.promiseCallback = function (callback) {
    var resolveCallback, rejectCallback;
    var createdPromise = new Promise(function (resolve, reject) {
        resolveCallback = resolve;
        rejectCallback = reject;
    });
    var doneCallback = resolveFromCallback(resolveCallback, rejectCallback);
    callback(doneCallback);
    return createdPromise;
};

/**
 * Returns an array with two values : the promise and the callback to call
 *
 * @deprecated Prefer use of S.promiseCallback()
 *
 * @example
 * var [promise, doneCallback] = promises.creator();
 * fs.readFile('./myFile.txt', doneCallback);
 * promise.then((txtContentBuffer) => {
 * 	   console.log(txtContentBuffer.toString());
 * });
 *
 * @return {Array}
 */
var creator = exports.creator = function () {
    var resolveCallback, rejectCallback;
    var createdPromise = new Promise(function (resolve, reject) {
        resolveCallback = resolve;
        rejectCallback = reject;
    });
    var doneCallback = resolveFromCallback(resolveCallback, rejectCallback);
    return [createdPromise, doneCallback];
};

/**
 * Returns a callback that resolve or reject the created promise that you can get with {promises}
 *
 * @deprecated Prefer use of S.promiseCallback()
 *
 * @return {Function} callback(err, result)
 */
var done = exports.done = function () {
    var resolveCallback, rejectCallback;
    createdPromise = new Promise(function (resolve, reject) {
        resolveCallback = resolve;
        rejectCallback = reject;
    });
    return resolveFromCallback(resolveCallback, rejectCallback);
};

/**
* Returns the Promise created by the previously called method done()
*
* @deprecated Prefer use of S.promiseCallback()
*
* @example
* promises.promise(callback(promises.done()));
*
* @return {Promise}
*/
var promise = exports.promise = function () {
    if (!createdPromise) {
        throw new Error("No promise in stack, done() should be called before");
    }
    var p = createdPromise;
    createdPromise = undefined;
    return p;
};

/**
 * Execute promises in parallel
 *
 * @param {Array|Object|Map|Set} iterable an iterable with .map method (like Array), or an key/value object
 * @param {Function} callback callback(value, index) called for each values
 * @return {Promise}
 */
var forEach = exports.forEach = function (iterable, callback) {
    if (Array.isArray(iterable)) {
        return Promise.all(iterable.map(callback));
    }
    var keys = [],
        values = [];
    S.forEach(S.map(iterable, callback), function (value, index) {
        keys.push(index);
        values.push(value);
    });

    return Promise.all(values).then(function (results) {
        return S.map(iterable, function (value, index) {
            return results[keys.indexOf(index)];
        });
    });
};

/**
 * Execute promises in series
 *
 * @param {Array|Object} iterable an iterable with .map method (like Array), or an key/value object
 * @param {Function} callback callback(value, index) called for each values
 * @return {Promise}
 */
var forEachSeries = exports.forEachSeries = function (iterable, callback) {
    return new Promise(function (resolve, reject) {
        var entriesIterator = S.entries(iterable);
        var results = new iterable.constructor();
        (function next() {
            var current = entriesIterator.next();
            if (current.done) {
                return resolve(results);
            }
            var key = current.value[0],
                value = current.value[1];
            var result = callback(value, key);
            if (result && typeof result.then === "function") {
                result.then(function (result) {
                    results[key] = result;
                    next();
                })["catch"](reject);
            } else {
                results[key] = result;
                setImmediate(next);
            }
        })();
    });
};

/**
 * Execute the second callback wile the first callback is true
 *
 * @param {Function} iterable an iterable with .map method (like Array), or an key/value object
 * @param {Function} callback callback(value, index) called for each values
 * @return {Promise}
 */
var whileTrue = exports.whileTrue = function (conditionCallback, callback) {
    return new Promise(function (resolve, reject) {
        (function next() {
            if (!conditionCallback()) {
                return resolve();
            }
            var result = callback();
            if (result && typeof result.then === "function") {
                result.then(function () {
                    setImmediate(next);
                })["catch"](reject);
            } else {
                setImmediate(next);
            }
        })();
    });
};

/**
 * Returns a promise
 *
 * The first argument is a callback with a done function
 *
 * @example
 * S.promiseCallback((done) => {
 *     fs.readFile('./myFile.txt', done);
 * }).then((txtContentBuffer) => {
 *     console.log(txtContentBuffer.toString());
 * });
 *
 * @function module:utils.promiseCallback
 * @param {Function} callback callback((done) => {})
 * @return {Promise}
 */
S.promiseCallback = promiseCallback;
Object.defineProperty(exports, "__esModule", {
    value: true
});
//# sourceMappingURL=promises.js.map