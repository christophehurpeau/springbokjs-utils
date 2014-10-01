"use strict";
exports.lcFirst = function(string) {
  return string.charAt(0).toLowerCase() + string.substr(1);
};
exports.ucFirst = function(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
};
exports.isEmpty = function(string) {
  return string.trim() === '';
};
exports.format = function(string) {
  var $__arguments0 = arguments;
  var $__arguments = $__arguments0;
  return exports.vformat(string, Array.prototype.slice.call($__arguments, 1));
};
exports.vformat = function(string, args) {
  var i = 0;
  return string.replace(/%s/g, function(m) {
    return args[i++] || '';
  });
};

//# sourceMappingURL=../string/string.js.map