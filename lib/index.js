"use strict";
exports.toInt = function(arg) {
  return parseInt(arg, 10);
};
exports.isString = function(arg) {
  return typeof arg === 'string';
};
exports.isObject = function(arg) {
  return typeof arg === 'object';
};
exports.isFunction = function(arg) {
  return typeof arg === 'function';
};
exports.isArray = Array.isArray;
exports.escape = function(html) {
  return String(html).replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};
exports.escapeUrl = function(html) {
  return html.replace(/&/g, '&amp;');
};
exports.regexpEscape = function(string) {
  return string.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1");
};
exports.defineProperty = function(target, property, value, writable, configurable, enumerable) {
  Object.defineProperty(target, property, {
    value: value,
    writable: !!writable,
    configurable: !!configurable,
    enumerable: !!enumerable
  });
  return target;
};
exports.defineProperties = function(target, properties, writable, configurable, enumerable) {
  if (!properties) {
    return target;
  }
  writable = !!writable;
  configurable = !!configurable;
  enumerable = !!enumerable;
  Object.keys(properties).forEach(function(key) {
    Object.defineProperty(target, key, {
      value: properties[key],
      writable: writable,
      configurable: configurable,
      enumerable: enumerable
    });
  });
  return target;
};
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

//# sourceMappingURL=index.js.map