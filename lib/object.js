"use strict";
exports.toMap = function(object) {
  if (object instanceof Map) {
    return object;
  }
  var map = new Map();
  for (var key in object) {
    map.set(key, object[key]);
  }
  return map;
};
exports.extend = function(target) {
  if (typeof target !== 'object') {
    throw new Error('target is not an object');
  }
  var objects = Array.from(arguments).filter(function(value) {
    return !!value;
  });
  if (objects.length === 1) {
    return target;
  }
  return Object.assign.apply(null, objects);
};
exports.union = function(target) {
  Array.from(arguments).slice(1).forEach(function(object) {
    if (object) {
      for (var key in object) {
        if (target[key] === undefined) {
          target[key] = object[key];
        }
      }
    }
  });
  return target;
};
exports.clone = function(object) {
  return Object.assign({}, object);
};
exports.filterKeys = function(object, keys) {
  var filteredObject = {};
  keys.forEach(function(k) {
    filteredObject[k] = object[k];
  });
  return filteredObject;
};
exports.mapJoin = function(object, separator, callback) {
  if (typeof separator === 'function') {
    callback = separator;
    separator = '';
  }
  object = exports.map(object, callback);
  return object.join(object, separator);
};
var _commonObjectArray = function(propertyName, object, callback, thisArg) {
  if (!thisArg) {
    thisArg = object;
  }
  if (object[propertyName]) {
    throw new Error('call ' + propertyName + ' !');
  }
  return Object.keys(object)[propertyName](function(key) {
    return callback.call(thisArg, object[key], key);
  });
};
exports.filter = function(object, callback, thisArg) {
  var keys = _commonObjectArray.call(null, 'filter', object, callback, thisArg);
  return exports.filterKeys(object, keys);
};
exports.find = function(object, callback, thisArg) {
  var key = this.findIndex.apply(null, arguments);
  return key && object[key];
};
exports.findIndex = _commonObjectArray.bind(null, 'find');
exports.forEach = _commonObjectArray.bind(null, 'forEach');
exports.join = function(object, separator) {
  return Object.keys(object).map(function(key) {
    return object[key];
  }).join(separator);
};
exports.map = function(object, callback, thisArg) {
  var mappedObject = {};
  exports.forEach(object, function(value, key) {
    mappedObject[key] = callback.apply(this, arguments);
  });
  return mappedObject;
};
exports.reduce = function(object, callback, initialValue) {
  return Object.keys(object).reduce(function(previousValue, currentValue, index, array) {
    return callback(previousValue, currentValue, array[currentValue], object);
  });
};
exports.reduceRight = function(object, callback, initialValue) {
  return Object.keys(object).reduceRight(function(previousValue, currentValue, index, array) {
    return callback(previousValue, currentValue, array[currentValue], object);
  });
};
exports.some = _commonObjectArray.bind(null, 'some');

//# sourceMappingURL=object.js.map