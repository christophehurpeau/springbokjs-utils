/**
 * fs API with Promises
 */

require('springbokjs-shim/es6');
var fs = require('fs');

[
    'rename',
    'ftruncate',
    'truncate',
    'chown',
    'fchown',
    'lchown',
    'chmod',
    'fchmod',
    'lchmod',
    'stat',
    'lstat',
    'fstat',
    'link',
    'symlink',
    'readlink',
    'realpath',
    'unlink',
    'rmdir',
    'mkdir',
    'readdir',
    'close',
    'open',
    'utimes',
    'futimes',
    'fsync',
    'write',
    'read',
    'readFile',
    'writeFile',
    'appendFile',
    'watchFile',
    'watch',
    'exists'
].forEach(function(name){
    var fsFn = fs[name];
    module.exports[name] = function() {
        var args = arguments;
        return new Promise(function(resolve, reject) {
            Array.prototype.push.call(args, function(err) {
                if (err) {
                    reject(err);
                } else {
                    var result = Array.prototype.slice.call(arguments, 1);
                    if (result.length === 1) {
                        result = result[0];
                    }
                    resolve(result);
                }
            });
            fsFn.apply(fs, args);
        });
    };
});