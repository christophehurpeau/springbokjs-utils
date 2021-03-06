"use strict";

/**
 * @module object
 */

/**
 * Transforms an object into a Map
 *
 * @param {Object|Map} object
 * @return {Map}
 */
var toMap = exports.toMap = function (object) {
    if (object instanceof Map) {
        return object;
    }
    var map = new Map();
    for (var key in object) {
        map.set(key, object[key]);
    }
    return map;
};

/**
 * Same as Object.assign, but doesn't override the value if !== undefined
 *
 * @param {Object} target
 * @param {Object} object
 * @return {Object} target
 */
var union = exports.union = function (target) {
    Array.from(arguments).slice(1).forEach(function (object) {
        if (object) {
            for (var key in object) {
                if (target[key] === undefined) {
                    target[key] = object[key];
                }
            }
        }
    });
    return target;
};

/**
 * Clones an object
 *
 * @param {Object} object
 * @return {Object} target
 */
var clone = exports.clone = function (object) {
    return Object.assign({}, object);
};

/**
 * Filter an object by the keys
 *
 * @param  {Object} object
 * @param  {Array} keys
 * @return {Object}
 */
var filterKeys = exports.filterKeys = function (object, keys) {
    var filteredObject = {};
    keys.forEach(function (k) {
        filteredObject[k] = object[k];
    });
    return filteredObject;
};


/**
 * Same a map + join
 *
 * @param  {Object} object
 * @param  {Array} keys
 * @return {Object}
 */
var mapJoin = exports.mapJoin = function (object, separator, callback) {
    if (typeof separator === "function") {
        callback = separator;
        separator = "";
    }
    object = exports.map(object, callback);
    return exports.join(object, separator);
};


// Array-like functions
var _commonObjectArray = function (propertyName, object, callback, thisArg) {
    if (!thisArg) {
        thisArg = object;
    }
    /*#if DEV*/
    if (object[propertyName]) {
        throw new Error("call " + propertyName + " !");
    }
    /*#/if*/
    return Object.keys(object)[propertyName](function (key) {
        return callback.call(thisArg, object[key], key);
    });
};



/**
 * The entries() method returns a new Iterator that contains the key/value pairs for each index in the Object.
*
* @param {Object|Map} object
* @return {Iterator}
*/
var entries = exports.entries = function (object) {
    var keys = Object.keys(object),
        i = 0;
    return Object.freeze({
        next: function next() {
            if (i >= keys.length) {
                return Object.freeze({ done: true });
            }
            return Object.freeze({ value: [keys[i], object[keys[i++]]], done: false });
        }
    });
};


/**
* The filter() method creates a new object with all elements that pass the test implemented by the provided function.
*
* @param {Object} object
* @param {Function} callback
* @param {*=} thisArg
* @return {Object}
*/
var filter = exports.filter = function (object, callback, thisArg) {
    var keys = _commonObjectArray.call(null, "filter", object, callback, thisArg);
    return exports.filterKeys(object, keys);
};

/**
* The find() method returns a value in the object,
* if an element in the object satisfies the provided testing function. Otherwise undefined is returned.
*
* @param {Object} object
* @param {Function} callback
* @param {*=} thisArg
* @return {*}
*/
var find = exports.find = function (object, callback, thisArg) {
    var key = exports.findIndex.apply(null, arguments);
    return key && object[key];
};

/**
* The findIndex() method returns an key in the object,
* if an element in the object satisfies the provided testing function. Otherwise undefined is returned.
*
* @function
* @param {Object} object
* @param {Function} callback
* @param {*=} thisArg
* @return {String|undefined}
*/
var findIndex = exports.findIndex = _commonObjectArray.bind(null, "find");

/**
* The forEach() method executes a provided function once per object element.
*
* @function
* @param {Object|Map} object
* @param {Function} callback
* @param {*} thisArg
* @return {*}
*/
var forEach = exports.forEach = _commonObjectArray.bind(null, "forEach");

/**
* The join() method joins all elements of an object into a string.
*
* @param {Object} object
* @param {String} separator
* @return {String}
*/
var join = exports.join = function (object, separator) {
    return Object.keys(object).map(function (key) {
        return object[key];
    }).join(separator);
};

/**
* The map() method creates a new object with the results of calling a provided function on every element in this object.
*
* @param {Object} object
* @param {Function} callback
* @param {*=} thisArg
* @return {*}
*/
var map = exports.map = function (object, callback, thisArg) {
    var mappedObject = {};
    exports.forEach(object, function (value, key) {
        mappedObject[key] = callback.apply(this, arguments);
    });
    return mappedObject;
};

/**
* The reduce() method applies a function against an accumulator
* and each value of the object (from left-to-right) has to reduce it to a single value.
*
* @param {Object} object
* @param {Function} callback
* @param {*=} initialValue
* @return {*}
*/
var reduce = exports.reduce = function (object, callback, initialValue) {
    return Object.keys(object).reduce(function (previousValue, currentValue, index, array) {
        return callback(previousValue, object[currentValue], currentValue, object);
    }, initialValue);
};

/**
* The reduceRight() method applies a function against an accumulator
* and each value of the object (from right-to-left) as to reduce it to a single value.
*
* @param {Object} object
* @param {Function} callback
* @param {*=} initialValue
* @return {*}
*/
var reduceRight = exports.reduceRight = function (object, callback, initialValue) {
    return Object.keys(object).reduceRight(function (previousValue, currentValue, index, array) {
        return callback(previousValue, object[currentValue], currentValue, object);
    }, initialValue);
};

/**
* The some() method tests whether some element in the object passes the test implemented by the provided function.
*
* @function
* @param {Object} object
* @param {Function} callback
* @param {*=} thisArg
* @return {Boolean}
*/
var some = exports.some = _commonObjectArray.bind(null, "some");
Object.defineProperty(exports, "__esModule", {
    value: true
});
//# sourceMappingURL=object.js.map