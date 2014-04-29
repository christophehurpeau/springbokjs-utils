var S = require('./index');
var promiseUtils = S.newLibrary();
module.exports = promiseUtils;

S.defineProperties(promiseUtils, {
    forEach: function(iterable, callback) {
        return Promise.all(iterable.map(callback));
    }
});