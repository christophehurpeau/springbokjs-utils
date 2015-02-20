"use strict";

/**
 * @module string
 */

/**
 * Make a string's first character lowercase
 *
 * @param {String} string
 * @return {String}
 */
var lcFirst = exports.lcFirst = function (string) {
  return string.charAt(0).toLowerCase() + string.substr(1);
};

/**
 * Make a string's first character uppercase
 *
 * @param {String} string
 * @return {String}
 */
var ucFirst = exports.ucFirst = function (string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
};

/**
 * Test if a string is empty
 *
 * @param {String} string
 * @return {Boolean}
 */
var isEmpty = exports.isEmpty = function (string) {
  return string.trim() === "";
};

/**
 * Format a string using %s
 *
 * @param {String} string
 * @param {...String} args
 * @return {String}
 */
var format = exports.format = function (string) {
  return exports.vformat(string, Array.prototype.slice.call(arguments, 1));
};

/**
 * Format a string using %s
 *
 * @param {String} string
 * @param {string[]} args
 * @return {String}
 */
var vformat = exports.vformat = function (string, args) {
  var i = 0;
  return string.replace(/%s/g, function (m) {
    return args[i++] || "";
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
//# sourceMappingURL=../string/string.js.map