/**
 * fs API with Promises
 */

require('springbokjs-shim/es6');
var fs = require('fs');
var objectUtils = require('./object');
var promiseUtils = require('./promise');
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
                    return reject(err);
                }
                var result = Array.prototype.slice.call(arguments, 1);
                if (result.length === 1) {
                    result = result[0];
                }
                resolve(result);
            });
            fsFn.apply(fs, args);
        });
    };
});

// Copy sync and other functions
Object.keys(fs).forEach(function(name) {
    if (!module.exports[name]) {
        module.exports[name] = fs[name];
    }
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

module.exports.writePrettyJsonFile = function() {
    var args = arguments;
    args[1] = JSON.stringify(args[1], null, 4);
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

/**
 * Recursively read a directory.
 * callback is called for each files
 * Return a Promise when all files are read.
 * @param {String} dir
 * @param {Object} options
 * @param {Function} callback
 * @return {Promise}
 */
module.exports.readRecursiveDirectory = function(dir, options, callback) {
    options = objectUtils.extend({
        recursive: true,
        directories: false,
    }, options);
    return module.exports.readdir(dir)
        .then(function(files) {
            return promiseUtils.forEach(files, function(file) {
                var path = dir + '/' + file;
                return module.exports.stat(path)
                    .then(function(stat) {
                        if (stat && stat.isDirectory()) {
                            if (options.directories) {
                                callback({ dirname: file, path: path, basedir: dir, stat: stat });
                            }
                            if (options.recursive) {
                                return module.exports.readRecursiveDirectory(path, options, callback);
                            }
                        } else {
                            callback({ filename: file, path: path, basedir: dir, stat: stat });
                            return true;
                        }
                    });
            });
        });
};
