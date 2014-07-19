"use strict";
exports.slice1 = function(array) {
  return Array.prototype.slice.call(array, 1);
};
exports.has = function(array, searchElement, i) {
  return Array.prototype.indexOf.call(array, searchElement, i) !== -1;
};
exports.hasAmong = function(array, searchElements, i) {
  for (var j = 0,
      l = searchElements.length; j < l; j++) {
    if (Array.prototype.indexOf.call(array, searchElements[j], i) !== -1) {
      return true;
    }
  }
  return false;
};
exports.remove = function(array, element) {
  var index = array.indexOf(element);
  if (index === -1) {
    return false;
  }
  array.splice(index, 1);
  return index;
};
exports.clone = function(array) {
  return array.slice(0);
};
exports.last = function(array) {
  return array[array.length - 1];
};
exports.random = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};
exports.sortFunctions = {
  '': function(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  },
  number: function(a, b) {
    return a - b;
  },
  string: function(a, b) {
    return a.localeCompare(b);
  }
};
exports.sortF = exports.sortFunctions;
exports.sortBy = function(array, propertyName, descending, sortFunction) {
  if (typeof descending === 'string' || typeof descending === 'function') {
    sortFunction = descending;
    descending = undefined;
  }
  if (typeof sortFunction !== 'function') {
    sortFunction = exports.sortFunctions[sortFunction == null ? '' : sortFunction];
  }
  return array.sort(descending ? function(b, a) {
    return sortFunction(a[propertyName], b[propertyName]);
  } : function(a, b) {
    return sortFunction(a[propertyName], b[propertyName]);
  });
};
exports.removeAll = function(array, callback) {
  array.forEach(function(elt, index) {
    if (callback(elt, index)) {
      array.splice(index, 1);
    }
  });
  return array.length;
};
exports.equals = function(array1, array2) {
  var length = array1.length;
  if (!Array.isArray(array1) || !Array.isArray(array2) || length != array2.length) {
    return false;
  }
  for (var i = 0; i < length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
};

//# sourceMappingURL=array.js.map