"use strict";
var crypto = require('crypto');

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
exports.md5 = function(data) {
    var shasum = crypto.createHash('md5');
    shasum.update(data);
    return shasum.digest('base64');
};

/**
 * Create an sha1 hash
 *
 * @param {Buffer|String} data
 * @return {String} base64 string
 */
exports.sha1 = function(data) {
    var shasum = crypto.createHash('sha1');
    shasum.update(data);
    return shasum.digest('base64');
};

/**
 * Create an sha512 hash
 *
 * @param {Buffer|String} data
 * @return {String} base64 string
 */
exports.sha512 = function(data) {
    var shasum = crypto.createHash('sha512');
    shasum.update(data);
    return shasum.digest('base64');
};

//# sourceMappingURL=security.js.map