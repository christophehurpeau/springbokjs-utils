/**
 * @module string
 */

/**
 * Make a string's first character lowercase
 *
 * @param {String} string
 * @return {String}
 */
export var lcFirst = function(string) {
    return string.charAt(0).toLowerCase() + string.substr(1);
};

/**
 * Make a string's first character uppercase
 *
 * @param {String} string
 * @return {String}
 */
export var ucFirst = function(string) {
    return string.charAt(0).toUpperCase() + string.substr(1);
};

/**
 * Test if a string is empty
 *
 * @param {String} string
 * @return {Boolean}
 */
export var isEmpty = function(string) {
    return string.trim() === '';
};

/**
 * Format a string using %s
 *
 * @param {String} string
 * @param {...String} args
 * @return {String}
 */
export var format = function(string) {
    return exports.vformat(string, Array.prototype.slice.call(arguments, 1));
};

/**
 * Format a string using %s
 *
 * @param {String} string
 * @param {string[]} args
 * @return {String}
 */
export var vformat = function(string, args) {
    var i = 0;
    return string.replace(/%s/g, (m) => args[i++] || '');
};
