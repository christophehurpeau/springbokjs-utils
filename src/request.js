var request = require('request');
var promiseUtils = require('./promises');

module.exports = function(uri, options) {
    return promiseUtils.promiseCallback((done) => {
        request(uri, options, function(error, response, body) {
            done(error, response);
        });
    });
};

'defaults put patch post head del get'.split(' ').forEach((key) => {
    module.exports[key] = function(uri, options) {
        return promiseUtils.promiseCallback((done) => {
            request[key](uri, options, function(error, response, body) {
                done(error, response);
            });
        });
    };
});

// copy request's properties
for (var k in request) {
    if (request.hasOwnProperty(k)) {
        if (!module.exports[k]) {
            module.exports[k] = request[k];
        }
    }
}
