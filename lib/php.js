"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

/* jshint freeze: false */

var S = _interopRequireWildcard(require("./index"));

if (!String.prototype.contains) {
    String.prototype.contains = function () {
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

/**
 * Php utils
 *
 * @module php
 */

/**
 * Export string into a php string in string
 *
 * @param {String} str
 * @return {String}
 */
var exportString = exports.exportString = function (str) {
    if (str.contains("\n") || str.contains("\r") || str.contains("\t") || str.contains("\u000b") || str.contains("\f")) {
        return "\"" + str.replace(/\\/g, "\\\\").replace(/\n/g, "\n").replace(/\r/g, "\r").replace(/\t/g, "\t").replace(/\v/g, "\u000b").replace(/\f/g, "\f").replace(/\$/, "$") + "\"";
    }
    if (!str.contains("'")) {
        return "'" + str + "'";
    }
    if (!str.contains("\"")) {
        return "\"" + str.replace(/\$/g, "$") + "\"";
    }
    return "'" + str.replace(/\'/g, "\\'") + "'";
};

var _exportCodeVar = exports._exportCodeVar = function (v) {
    if (S.isString(v)) {
        return exportString(v);
    }
    if (v === undefined || v === null) {
        return "null";
    }
    if (v === true) {
        return "true";
    }
    if (v === false) {
        return "false";
    }
    return v; // numeric
};

var _exportCode = exports._exportCode = function (v, start) {
    if (v === null || !S.isObject(v)) {
        return _exportCodeVar(v);
    }

    var content = "array(";
    if (S.isArray(v)) {
        for (var i = 0, l = v.length; i < l; i++) {
            content += _exportCode(v[i]) + ",";
        }
    } else {
        for (var k in v) {
            content += _exportCodeVar(k) + "=>" + _exportCode(v[k]) + ",";
        }
    }
    if (content) {
        content = content.replace(/,+$/, "");
    }
    content += start ? ")" : "),";
    return content;
};

/**
 * Export javascript object into a php code in string
 *
 * @param {any} v
 * @param {bool} ifEmptyArray
 * @return {String}
 */
var exportCode = exports.exportCode = function (v, ifEmptyArray) {
    var content = _exportCode(v, true);
    if (ifEmptyArray !== undefined && (content === "false" || content === "array()")) {
        return ifEmptyArray;
    }
    return content;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
//# sourceMappingURL=php.js.map