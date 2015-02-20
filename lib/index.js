"use strict";

/**
 * Utils
 *
 * @module utils
 */

/**
 * shortcut for parseInt(value, 10)
 *
 * @param {String} value
 * @return {Number} parsed int
 */
var toInt = exports.toInt = function (value) {
  return parseInt(value, 10);
};

/* IS */

/**
 * Test is a variable is a string
 * @param {*} value
 * @return {Boolean}
 */
var isString = exports.isString = function (value) {
  return typeof value === "string";
};

/**
 * Test is a variable is an object
 * @param {*} value
 * @return {Boolean}
 */
var isObject = exports.isObject = function (value) {
  return typeof value === "object";
};

/**
 * Test is a variable is a function
 * @param {*} value
 * @return {Boolean}
 */
var isFunction = exports.isFunction = function (value) {
  return typeof value === "function";
};

/**
 * Test is a variable is a number
 * @param {*} value
 * @return {Boolean}
 */
var isNumber = exports.isNumber = function (value) {
  return typeof value === "number";
};

/**
 * Test is a variable is a integer number
 * @param {*} value
 * @return {Boolean}
 */
var isInteger = exports.isInteger = function (value) {
  return Number.isInteger(value);
};

/**
 * Test is a variable is an array
 *
 * @function
 * @param {*} arg
 * @return {Boolean}
 */
var isArray = exports.isArray = Array.isArray;


/* HTML */

/**
 * Escape an html string
 *
 * @param {String} html string to be escaped
 * @return {String} escaped string
 */
var escape = exports.escape = function (html) {
  return String(html).replace(/&(?!\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
};

/**
 * Escape an url for html
 *
 * @param {String} url
 * @return {String} escaped url
 */
var escapeUrl = exports.escapeUrl = function (html) {
  return html.replace(/&/g, "&amp;");
};

/**
 * Escape a string for regexp
 *
 * @param {String} string
 * @return {String} escaped string
 */
var regexpEscape = exports.regexpEscape = function (string) {
  return string.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1");
};


/**
 * Shortcut for Object.defineProperty
 *
 * @param {Object} target
 * @param {String} property name of the property
 * @param {*} value value
 * @param {Object=} options: writable default true, configurable default true, enumerable default false
 * @return {Object} target
 */
var defineProperty = exports.defineProperty = function (target, property, value, options) {
  Object.defineProperty(target, property, {
    value: value,
    writable: (options && options.writable) !== false,
    configurable: (options && options.configurable) !== false,
    enumerable: !!(options && options.enumerable)
  });
  return target;
};

/**
 * Shortcut for Object.defineProperty
 *
 * @param {Object} target
 * @param {String} property name of the property
 * @param {*} value value
 * @param {Object=} options: enumerable default false
 * @return {Object} target
 */
var defineConstant = exports.defineConstant = function (target, property, value, options) {
  Object.defineProperty(target, property, {
    value: value,
    writable: false,
    configurable: false,
    enumerable: !!(options && options.enumerable)
  });
  return target;
};

/**
 * Shortcut for Object.defineProperty
 *
 * @param {Object} target
 * @param {String} property name of the property
 * @param {Function} getter getter function
 * @param {Object=} options: configurable default true, enumerable default false
 * @return {Object} target
 */
var defineGetter = exports.defineGetter = function (target, property, getter, options) {
  Object.defineProperty(target, property, {
    get: getter,
    configurable: (options && options.configurable) !== false,
    enumerable: !!(options && options.enumerable)
  });
  return target;
};

/**
 * Shortcut for Object.defineProperty
 *
 * @param {Object} target
 * @param {String} property name of the property
 * @param {Function} setter setter function
 * @param {Object=} options: configurable default true, enumerable default false
 * @return {Object} target
 */
var defineSetter = exports.defineSetter = function (target, property, setter, options) {
  Object.defineProperty(target, property, {
    set: setter,
    configurable: (options && options.configurable) !== false,
    enumerable: !!(options && options.enumerable)
  });
  return target;
};

/**
 * Shortcut for Object.defineProperties
 *
 * @param {Object} target
 * @param {Object} properties
 * @param {Object=} options: writable default true, configurable default true, enumerable default false
 * @return {Object} target
 */
var defineProperties = exports.defineProperties = function (target, properties, options) {
  if (!properties) {
    return target;
  }
  options = {
    writable: (options && options.writable) !== false,
    configurable: (options && options.configurable) !== false,
    enumerable: !!(options && options.enumerable)
  };
  Object.keys(properties).forEach(function (key) {
    Object.defineProperty(target, key, {
      value: properties[key],
      writable: options.writable,
      configurable: options.configurable,
      enumerable: options.enumerable
    });
  });
  return target;
};


/**
 * The entries() method returns a new Iterator that contains the key/value pairs for each index in the Object|Array.
 *
 * @function module:utils.entries
 * @param {Object|Array|Map} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {Iterator}
 */

/**
 * The filter() method creates a new Object|Array with all elements
 * that pass the test implemented by the provided function.
 *
 * @function module:utils.filter
 * @param {Object|Array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {Object|Array}
 */

/**
 * The find() method returns a value in the Object|Array
 * if an element in the Object|Array satisfies the provided testing function.
 *
 * @function module:utils.find
 * @param {Object|Array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {*}
 */


/**
 * The findIndex() method returns a value in the Object|Array
 * if an element in the Object|Array satisfies the provided testing function.
 *
 * @function module:utils.findIndex
 * @param {Object|Array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {number|string|undefined}
 */

/**
 * The forEach() method executes a provided function once per Object|Array element.
 *
 * @function module:utils.forEach
 * @param {Object|Array|Map} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {number|string|undefined}
 */

/**
 * The join() method joins all elements of an Object|Array into a string.
 *
 * @function module:utils.join
 * @param {Object|Array} arg
 * @param {String} separator
 * @return {String}
 */

/**
 * The map() method creates a new Object|Array with the results
 * of calling a provided function on every element in this Object|Array.
 *
 * @function module:utils.map
 * @param {Object|Array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {Object|Array}
 */

/**
 * The reduce() method applies a function against an accumulator
 * and each value of the Object|Array (from left-to-right) has to reduce it to a single value.
 *
 * @function module:utils.reduce
 * @param {Object|Array} arg
 * @param {Function} callback callback(previousValue, currentKey, currentValue, objectOrArray)
 * @param {*=} initialValue
 * @return {*}
 */

// TODO http://usejsdoc.org/tags-callback.html
/**
 * The reduceRight() method applies a function against an accumulator
 * and each value of the Object|Array (from right-to-left) has to reduce it to a single value.
 *
 * @function module:utils.reduceRight
 * @param {Object|Array} arg
 * @param {Function} callback callback(previousValue, currentKey, currentValue, objectOrArray)
 * @param {*=} initialValue
 * @return {*}
 */

/**
 * The some() method tests whether some element in the Object|Array
 * passes the test implemented by the provided function.
 *
 * @function module:utils.some
 * @param {Object|Array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {*}
 */

"entries filter find findIndex forEach join map reduce reduceRight some".split(" ").forEach(function (methodName) {
  exports[methodName] = function (arrayOrObject) {
    var args = Array.prototype.slice.call(arguments, 1);
    var method = arrayOrObject[methodName];
    if (!method) {
      method = exports.object[methodName];
      args.unshift(arrayOrObject);
    }
    return method.apply(arrayOrObject, args);
  };
});

/**
 * The mapToArray() method creates a new array with the results
 * of calling a provided function on every element in this Object|Array.
 *
 * @function module:utils.mapToArray
 * @param {Object|Array|Map} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {Array}
 */

var mapToArray = exports.mapToArray = function (arrayOrObject, callback) {
  if (Array.isArray(arrayOrObject)) {
    return arrayOrObject.map(callback);
  }
  var array = [];
  exports.forEach(arrayOrObject, function (value, index) {
    array.push(callback(value, index));
  });
  return array;
};


/**
 * Access to the array module
 *
 * @constant module:utils.array
 * @type module:array
 */
var array = exports.array = require("./array");

/**
 * Access to the object module
 *
 * @constant module:utils.object
 * @type module:object
 */
var object = exports.object = require("./object");

/**
 * Access to the string module
 *
 * @constant module:utils.string
 * @type module:string
 */
var string = exports.string = require("./string/string");

/**
 * Access to the promises module
 *
 * @constant module:utils.promises
 * @type module:promises
 */
var promises = exports.promises = require("./promises");
Object.defineProperty(exports, "__esModule", {
  value: true
});
//# sourceMappingURL=index.js.map