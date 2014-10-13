/**
 * Utils
 *
 * @exports utils
 */
var utils = {
    /**
     * shortcut for parseInt(arg, 10)
     *
     * @param {string} arg
     * @return {number} parsed int
     */
    toInt(arg) {
        return parseInt(arg, 10);
    },

    /* IS */

    /**
     * Test is a variable is a string
     * @param  {*}  arg
     * @return {boolean}
     */
    isString: function(arg) {
        return typeof arg === 'string';
    },

    /**
     * Test is a variable is an object
     * @param  {*}  arg
     * @return {boolean}
     */
    isObject: function(arg) {
        return typeof arg === 'object';
    },

    /**
     * Test is a variable is a function
     * @param  {*}  arg
     * @return {boolean}
     */
    isFunction: function(arg) {
        return typeof arg === 'function';
    },

    /**
     * Test is a variable is an array
     * @param  {*}  arg
     * @return {boolean}
     */
    isArray: Array.isArray,


    /* HTML */

    /**
     * Escape an html string
     *
     * @param {string} html string to be escaped
     * @return {string} escaped string
     */
    escape(html) {
        return String(html)
            .replace(/&(?!\w+;)/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    },

    /**
     * Escape an url for html
     *
     * @param {string} url
     * @return {string} escaped url
     */
    escapeUrl(html) {
        return html.replace(/&/g,'&amp;');
    },

    /**
     * Escape a string for regexp
     *
     * @param {string} string
     * @return {string} escaped string
     */
    regexpEscape(string) {
        return string.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1" );
    }
};

module.exports = utils;

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
 * @param {string} separator
 * @return {string}
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
    utils[methodName] = function(arrayOrObject) {
        var args = Array.prototype.slice.call(arguments, 1);
        var method = arrayOrObject[methodName];
        if (!method) {
            method = utils.object[methodName];
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

utils.mapToArray = function(arrayOrObject, callback) {
    if (Array.isArray(arrayOrObject)) {
        return arrayOrObject.map(callback);
    }
    var array = [];
    utils.forEach(arrayOrObject, function(value, index) {
        array.push(callback(value, index));
    });
    return array;
};

utils.array = require('./array.js');
utils.object = require('./object.js');
utils.string = require('./string/string.js');
utils.promises = require('./promises');
