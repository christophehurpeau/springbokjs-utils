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

//# sourceMappingURL=generator.js.map