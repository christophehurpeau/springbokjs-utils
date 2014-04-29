/**
 * fs API with Promises
 */

require('springbokjs-shim/es6');
var fs = require('fs');
var YAML = require('js-yaml');

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


module.exports.readJsonFile = function() {
    return module.exports.readFile.apply(module.exports, arguments)
        .then(JSON.parse);
};

module.exports.readJsonFileSync = function() {
    var result = fs.readFileSync.apply(fs, arguments);
    if (result) {
        result = JSON.parse(result);
    }
    return result;
};

module.exports.writeJsonFile = function() {
    var args = arguments;
    args[1] = JSON.stringify(args[1]);
    return module.exports.writeFile.apply(module.exports, args);
};


var parseYaml = function(content) {
    return YAML.safeLoad(content.toString());
};

var stringifyYaml = YAML.safeDump;

module.exports.readYamlFile = function() {
    return module.exports.readFile.apply(module.exports, arguments)
        .then(parseYaml);
};

module.exports.readYamlFileSync = function() {
    var result = fs.readFileSync.apply(fs, arguments);
    if (result) {
        result = parseYaml(result);
    }
    return result;
};

module.exports.writeYamlFile = function() {
    var args = arguments;
    args[2] = stringifyYaml(args[2]);
    return module.exports.writeFile.apply(module.exports, args);
};
