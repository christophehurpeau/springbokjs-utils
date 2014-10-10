"use strict";
var request = require('request');
var promiseUtils = require('./promises');
module.exports = function(uri, options) {
  return promiseUtils.promiseCallback(function(done) {
    request(uri, options, function(error, response, body) {
      done(error, response);
    });
  });
};
'defaults put patch post head del get'.split(' ').forEach(function(key) {
  module.exports[key] = function(uri, options) {
    return promiseUtils.promiseCallback(function(done) {
      request(uri, options, function(error, response, body) {
        done(error, response);
      });
    });
  };
});
for (var k in request) {
  if (request.hasOwnProperty(k)) {
    if (!module.exports[k]) {
      module.exports[k] = request[k];
    }
  }
}

//# sourceMappingURL=request.js.map