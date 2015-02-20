import request from 'request';
import promiseUtils from './promises';

exports = module.exports = function(uri, options) {
    return promiseUtils.promiseCallback((done) => {
        request(uri, options, function(error, response, body) {
            done(error, response);
        });
    });
};

exports.request = request;

'defaults put patch post head del get'.split(' ').forEach((key) => {
    exports[key] = function(uri, options) {
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
        if (!exports[k]) {
            exports[k] = request[k];
        }
    }
}
