/**
 * fs API with Promises
 */

var fs = require('fs');
var objectUtils = require('./object');
var promiseUtils = require('./promises');
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
    'exists'
].forEach(function(name){
    var fsFn = fs[name];
    if (!fsFn) {
        return;
    }
    exports[name] = function() {
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
    if (!exports[name]) {
        exports[name] = fs[name];
    }
});

exports.readJsonFile = function() {
    return exports.readFile.apply(exports, arguments)
        .then(JSON.parse);
};

exports.readJsonFileSync = function() {
    var result = fs.readFileSync.apply(fs, arguments);
    if (result) {
        result = JSON.parse(result);
    }
    return result;
};

exports.writeJsonFile = function() {
    var args = arguments;
    args[1] = JSON.stringify(args[1]);
    return exports.writeFile.apply(exports, args);
};

exports.writePrettyJsonFile = function() {
    var args = arguments;
    args[1] = JSON.stringify(args[1], null, 4);
    return exports.writeFile.apply(exports, args);
};


var parseYaml = function(content) {
    return YAML.safeLoad(content.toString());
};

var stringifyYaml = YAML.safeDump;

exports.readYamlFile = function() {
    return exports.readFile.apply(exports, arguments)
        .then(parseYaml);
};

exports.readYamlFileSync = function() {
    var result = fs.readFileSync.apply(fs, arguments);
    if (result) {
        result = parseYaml(result);
    }
    return result;
};

exports.writeYamlFile = function() {
    var args = arguments;
    args[2] = stringifyYaml(args[2]);
    return exports.writeFile.apply(exports, args);
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
exports.readRecursiveDirectory = function(dir, options, callback) {
    options = objectUtils.extend({
        recursive: true,
        directories: false,
    }, options);
    return exports.readdir(dir)
        .then((files) => {
            return promiseUtils.forEach(files, (file) => {
                var path = dir + '/' + file;
                return exports.stat(path)
                    .then((stat) => {
                        if (stat && stat.isDirectory()) {
                            if (options.directories) {
                                return callback({ dirname: file, path: path, basedir: dir, stat: stat });
                            }
                            if (options.recursive) {
                                return exports.readRecursiveDirectory(path, options, callback);
                            }
                        } else {
                            return callback({ filename: file, path: path, basedir: dir, stat: stat });
                        }
                    });
            });
        });
};
