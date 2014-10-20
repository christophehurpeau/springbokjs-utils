/**
 * Utils
 *
 * @module utils
 */

/**
 * shortcut for parseInt(arg, 10)
 *
 * @param {String} arg
 * @return {Number} parsed int
 */
exports.toInt = function(arg) {
    return parseInt(arg, 10);
};

/* IS */

/**
 * Test is a variable is a string
 * @param {*} arg
 * @return {Boolean}
 */
exports.isString = function(arg) {
    return typeof arg === 'string';
};

/**
 * Test is a variable is an object
 * @param {*} arg
 * @return {Boolean}
 */
exports.isObject = function(arg) {
    return typeof arg === 'object';
};

/**
 * Test is a variable is a function
 * @param {*} arg
 * @return {Boolean}
 */
exports.isFunction = function(arg) {
    return typeof arg === 'function';
};

/**
 * Test is a variable is an array
 *
 * @function
 * @param {*} arg
 * @return {Boolean}
 */
exports.isArray = Array.isArray;


/* HTML */

/**
 * Escape an html string
 *
 * @param {String} html string to be escaped
 * @return {String} escaped string
 */
exports.escape = function(html) {
    return String(html)
        .replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};

/**
 * Escape an url for html
 *
 * @param {String} url
 * @return {String} escaped url
 */
exports.escapeUrl = function(html) {
    return html.replace(/&/g,'&amp;');
};

/**
 * Escape a string for regexp
 *
 * @param {String} string
 * @return {String} escaped string
 */
exports.regexpEscape = function(string) {
    return string.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1" );
};


/**
 * Shortcut for Object.defineProperty
 *
 * @param {Object} target
 * @param {Object} properties
 * @param {Boolean=} writable
 * @param {Boolean=} configurable
 * @param {Boolean=} enumerable
 * @return {Object} target
 */
exports.defineProperty = function(target, property, value, writable, configurable, enumerable) {
    Object.defineProperty(target, property, {
        value: value,
        writable: !!writable,
        configurable: !!configurable,
        enumerable: !!enumerable
    });
    return target;
};


/**
 * Shortcut for Object.defineProperties
 *
 * @param {Object} target
 * @param {Object} properties
 * @param {Boolean=} writable
 * @param {Boolean=} configurable
 * @param {Boolean=} enumerable
 * @return {Object} target
 */
exports.defineProperties = function(target, properties, writable, configurable, enumerable) {
    if (!properties) {
        return target;
    }
    writable = !!writable;
    configurable = !!configurable;
    enumerable = !!enumerable;
    Object.keys(properties).forEach((key) => {
        Object.defineProperty(target, key, {
            value: properties[key],
            writable: writable,
            configurable: configurable,
            enumerable: enumerable
        });
    });
    return target;
};


/**
 * The filter() method creates a new object|array with all elements
 * that pass the test implemented by the provided function.
 *
 * @method filter
 * @memberof utils
 * @param {object|array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {object|array}
 */

/**
 * The find() method returns a value in the object|array
 * if an element in the object|array satisfies the provided testing function.
 *
 * @method find
 * @memberof utils
 * @param {object|array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {*}
 */


/**
 * The findIndex() method returns a value in the object|array
 * if an element in the object|array satisfies the provided testing function.
 *
 * @method findIndex
 * @memberof utils
 * @param {object|array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {number|string|undefined}
 */

/**
 * The forEach() method executes a provided function once per object|array element.
 *
 * @method forEach
 * @memberof utils
 * @param {object|array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {number|string|undefined}
 */

/**
 * The join() method joins all elements of an object|array into a string.
 *
 * @method forEach
 * @memberof utils
 * @param {object|array} arg
 * @param {String} separator
 * @return {String}
 */

/**
 * The map() method creates a new object|array with the results
 * of calling a provided function on every element in this object|array.
 *
 * @method map
 * @memberof utils
 * @param {object|array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {object|array}
 */

/**
 * The reduce() method applies a function against an accumulator
 * and each value of the object|array (from left-to-right) has to reduce it to a single value.
 *
 * @method reduce
 * @memberOf utils
 * @param {object|array} arg
 * @param {Function} callback callback(previousValue, currentKey, currentValue, objectOrArray)
 * @param {*=} initialValue
 * @return {*}
 */

// TODO http://usejsdoc.org/tags-callback.html
/**
 * The reduceRight() method applies a function against an accumulator
 * and each value of the object|array (from right-to-left) has to reduce it to a single value.
 *
 * @method reduceRight
 * @memberOf utils
 * @param {object|array} arg
 * @param {Function} callback callback(previousValue, currentKey, currentValue, objectOrArray)
 * @param {*=} initialValue
 * @return {*}
 */

/**
 * The some() method tests whether some element in the object|array
 * passes the test implemented by the provided function.
 *
 * @method some
 * @memberOf utils
 * @param {object|array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {*}
 */

'filter find findIndex forEach join map reduce reduceRight some'.split(' ').forEach(function(methodName) {
    exports[methodName] = function(arrayOrObject) {
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
 * of calling a provided function on every element in this object|array.
 *
 * @method mapToArray
 * @memberof utils
 * @param {object|array} arg
 * @param {Function} callback
 * @param {*=} thisArg
 * @return {Array}
 */

exports.mapToArray = function(arrayOrObject, callback) {
    if (Array.isArray(arrayOrObject)) {
        return arrayOrObject.map(callback);
    }
    var array = [];
    exports.forEach(arrayOrObject, function(value, index) {
        array.push(callback(value, index));
    });
    return array;
};

exports.array = require('./array.js');
exports.object = require('./object.js');
exports.string = require('./string/string.js');
exports.promises = require('./promises');
