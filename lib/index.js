"use strict";
var utils = {
  toInt: function(arg) {
    return parseInt(arg, 10);
  },
  isString: function(arg) {
    return typeof arg === 'string';
  },
  isObject: function(arg) {
    return typeof arg === 'object';
  },
  isFunction: function(arg) {
    return typeof arg === 'function';
  },
  isArray: Array.isArray,
  escape: function(html) {
    return String(html).replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },
  escapeUrl: function(html) {
    return html.replace(/&/g, '&amp;');
  },
  regexpEscape: function(s) {
    return s.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1");
  }
};
module.exports = utils;
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

//# sourceMappingURL=index.js.map