"use strict";

var request = require("request");
var promiseUtils = require("./promises");

exports = module.exports = function (uri, options) {
    return promiseUtils.promiseCallback(function (done) {
        request(uri, options, function (error, response, body) {
            done(error, response);
        });
    });
};

exports.request = request;

"defaults put patch post head del get".split(" ").forEach(function (key) {
    exports[key] = function (uri, options) {
        return promiseUtils.promiseCallback(function (done) {
            request[key](uri, options, function (error, response, body) {
                done(error, response);
            });
        });
    };
});

// copy request's properties
for (var k in request) {
    if (request.hasOwnProperty(k)) {
        if (!exports[k]) {
            exports[k] = request[k];
        }
    }
}
//# sourceMappingURL=request.js.map