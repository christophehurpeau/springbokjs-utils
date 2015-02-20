"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

/* global test */
var assert = require("proclaim");
var expect = assert.strictEqual;
var lib = "../../lib" + (process.env.TEST_COV && "-cov" || "") + "/";

var promises = require(lib + "promises");



test("it should failed because done() should be called before promise()", function () {
    assert.throws(promises.promise, "No promise in stack, done() should be called before");
});

test("done() and promise() should work", function () {
    var callback = promises.done();
    assert.isFunction(callback);
    var promise = promises.promise();
    assert.isInstanceOf(promise, Promise);

    promise = promise.then(function (result) {
        expect(result, 20);
    });

    callback(null, 20); // resolve promise

    return promise;
});


test("done() and promise() should work when there is an error", function () {
    var callback = promises.done();
    assert.isFunction(callback);
    var promise = promises.promise();
    assert.isInstanceOf(promise, Promise);
    promise = promise.then(function () {
        assert.notOk(true, "This should never be called");
    })["catch"](function (err) {
        expect(err, "test error");
    });

    callback("test error");

    return promise;
});


test("forEach() with an array with one value", function () {
    var promise = promises.forEach([new Promise(function (resolve) {
        return resolve("ok");
    })], function (value) {
        return value;
    });
    return promise.then(function (result) {
        assert.deepEqual(result, ["ok"]);
    });
});


test("forEach() with an array with several values", function () {
    var promise = promises.forEach(["ok", "test2", new Promise(function (resolve) {
        return resolve("ok3");
    })], function (value) {
        if (value === "ok") {
            return new Promise(function (resolve) {
                return resolve("ok1");
            });
        }
        return value;
    });
    return promise.then(function (result) {
        assert.deepEqual(result, ["ok1", "test2", "ok3"]);
    });
});

test("forEach() with an object with several values", function () {
    var promise = promises.forEach({
        value1: new Promise(function (resolve) {
            return resolve("ok");
        }),
        value2: "test2",
        value3: new Promise(function (resolve) {
            setTimeout(function () {
                resolve(4);
            }, 20);
        })
    }, function (value) {
        return value;
    });
    return promise.then(function (result) {
        assert.deepEqual(result, { value1: "ok", value2: "test2", value3: 4 });
    });
});


test("forEach() fails", function () {
    var promise = promises.forEach(["test1", "test2"], function () {
        return new Promise(function (resolve, reject) {
            reject("test error");
        });
    });
    return promise.then(function () {
        assert.notOk(true, "This should never be called");
    })["catch"](function (err) {
        expect(err, "test error");
    });
});

test("forEach() fails asynchronously", function () {
    var promise = promises.forEach(["test1", new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject("test error");
        }, 20);
    })], function (value) {
        return value;
    });
    return promise.then(function () {
        assert.notOk(true, "This should never be called");
    })["catch"](function (err) {
        expect(err, "test error");
    });
});


test("forEachSeries() with an array with one value", function () {
    var promise = promises.forEachSeries([new Promise(function (resolve) {
        return resolve("ok");
    })], function (value) {
        return value;
    });
    return promise.then(function (result) {
        assert.deepEqual(result, ["ok"]);
    });
});

test("forEachSeries() with an array with several values", function () {
    var promise = promises.forEachSeries(["ok", "test2", new Promise(function (resolve) {
        return resolve("ok3");
    })], function (value) {
        if (value === "ok") {
            return new Promise(function (resolve) {
                return resolve("ok1");
            });
        }
        return value;
    });
    return promise.then(function (result) {
        assert.deepEqual(result, ["ok1", "test2", "ok3"]);
    });
});

test("whileTrue() with an array with several values", function () {
    var iterator = ["ok", "test2", new Promise(function (resolve) {
        return resolve("ok3");
    })].entries();
    var current,
        results = [];
    var promise = promises.whileTrue(function () {
        current = iterator.next();
        return !current.done;
    }, function () {
        if (current.value[1] instanceof Promise) {
            return current.value[1].then(function (result) {
                return results.push(result);
            });
        }
        results.push(current.value[1]);
    });
    return promise.then(function () {
        assert.deepEqual(results, ["ok", "test2", "ok3"]);
    });
});



test("creator() should work", function () {
    var _promises$creator = promises.creator();

    var _promises$creator2 = _slicedToArray(_promises$creator, 2);

    var promise = _promises$creator2[0];
    var callback = _promises$creator2[1];
    assert.isFunction(callback);
    assert.isInstanceOf(promise, Promise);

    promise = promise.then(function (result) {
        expect(result, 20);
    });

    callback(null, 20); // resolve promise

    return promise;
});


test("promiseCallback() should work", function () {
    var promise = promises.promiseCallback(function (done) {
        assert.isFunction(done);

        done(null, 20); // resolve promise
    });
    assert.isInstanceOf(promise, Promise);

    promise = promise.then(function (result) {
        expect(result, 20);
    });

    return promise;
});
//# sourceMappingURL=promises.js.map