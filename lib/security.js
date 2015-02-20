"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var crypto = _interopRequire(require("crypto"));

/**
 * Security
 * Only for NodeJS
 *
 * @module security
 */

/**
 * Create an md5 hash
 *
 * @param {Buffer|String} data
 * @return {String} base64 string
 */
var md5 = exports.md5 = function (data) {
  var shasum = crypto.createHash("md5");
  shasum.update(data);
  return shasum.digest("base64");
};

/**
 * Create an sha1 hash
 *
 * @param {Buffer|String} data
 * @return {String} base64 string
 */
var sha1 = exports.sha1 = function (data) {
  var shasum = crypto.createHash("sha1");
  shasum.update(data);
  return shasum.digest("base64");
};

/**
 * Create an sha512 hash
 *
 * @param {Buffer|String} data
 * @return {String} base64 string
 */
var sha512 = exports.sha512 = function (data) {
  var shasum = crypto.createHash("sha512");
  shasum.update(data);
  return shasum.digest("base64");
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
//# sourceMappingURL=security.js.map