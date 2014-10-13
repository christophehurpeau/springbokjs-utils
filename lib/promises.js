"use strict";
var S = require('./index');
var createdPromise;
var promises = {
  promiseCallback: function(callback) {
    var resolveCallback,
        rejectCallback;
    var createdPromise = new Promise(function(resolve, reject) {
      resolveCallback = resolve;
      rejectCallback = reject;
    });
    var doneCallback = promises.resolveFromCallback(resolveCallback, rejectCallback);
    callback(doneCallback);
    return createdPromise;
  },
  creator: function() {
    var resolveCallback,
        rejectCallback;
    var createdPromise = new Promise(function(resolve, reject) {
      resolveCallback = resolve;
      rejectCallback = reject;
    });
    var doneCallback = promises.resolveFromCallback(resolveCallback, rejectCallback);
    return [createdPromise, doneCallback];
  },
  done: function() {
    var resolveCallback,
        rejectCallback;
    createdPromise = new Promise(function(resolve, reject) {
      resolveCallback = resolve;
      rejectCallback = reject;
    });
    return promises.resolveFromCallback(resolveCallback, rejectCallback);
  },
  promise: function() {
    if (!createdPromise) {
      throw new Error('No promise in stack, done() should be called before');
    }
    var p = createdPromise;
    createdPromise = undefined;
    return p;
  },
  forEach: function(iterable, callback) {
    if (Array.isArray(iterable)) {
      return Promise.all(iterable.map(callback));
    }
    var keys = [],
        values = [];
    S.forEach(S.map(iterable, callback), function(value, index) {
      keys.push(index);
      values.push(value);
    });
    return Promise.all(values).then(function(results) {
      return S.map(iterable, function(value, index) {
        return results[keys.indexOf(index)];
      });
    });
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
        var key = current.value[0],
            value = current.value[1];
        var result = callback(value, key);
        if (result instanceof Promise) {
          result.then(function(result) {
            results[key] = result;
            next();
          }).catch(reject);
        } else {
          results[key] = result;
          setImmediate(next);
        }
      };
      next();
    });
  },
  whileTrue: function(conditionCallback, callback) {
    return new Promise(function(resolve, reject) {
      (function next() {
        if (!conditionCallback()) {
          resolve();
        }
        var result = callback();
        if (result instanceof Promise) {
          result.then(function() {
            setImmediate(next);
          }).catch(reject);
        } else {
          setImmediate(next);
        }
      })();
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
};
module.exports = promises;

//# sourceMappingURL=promises.js.map