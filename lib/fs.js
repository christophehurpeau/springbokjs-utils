"use strict";
var fs = require('fs');
var objectUtils = require('./object');
var promiseUtils = require('./promises');
var YAML = require('js-yaml');
exports.rename = function() {};
exports.rename = function() {};
['rename', 'ftruncate', 'truncate', 'chown', 'fchown', 'lchown', 'chmod', 'fchmod', 'lchmod', 'stat', 'lstat', 'fstat', 'link', 'symlink', 'readlink', 'realpath', 'unlink', 'rmdir', 'mkdir', 'readdir', 'close', 'open', 'utimes', 'futimes', 'fsync', 'write', 'read', 'readFile', 'writeFile', 'appendFile', 'exists'].forEach(function(name) {
  var fsFn = fs[name];
  if (!fsFn) {
    return;
  }
  exports[name] = function() {
    var $__arguments0 = arguments;
    var $__arguments = $__arguments0;
    var args = $__arguments;
    return new Promise(function(resolve, reject) {
      Array.prototype.push.call(args, function(err) {
        var $__arguments1 = arguments;
        var $__arguments0 = $__arguments1;
        if (err) {
          return reject(err);
        }
        var result = Array.prototype.slice.call($__arguments0, 1);
        if (result.length === 1) {
          result = result[0];
        }
        resolve(result);
      });
      fsFn.apply(fs, args);
    });
  };
});
Object.keys(fs).forEach(function(name) {
  if (!exports[name]) {
    exports[name] = fs[name];
  }
});
exports.readJsonFile = function() {
  var $__arguments2 = arguments;
  var $__arguments = $__arguments2;
  return exports.readFile.apply(exports, $__arguments).then(JSON.parse);
};
exports.readJsonFileSync = function() {
  var $__arguments3 = arguments;
  var $__arguments = $__arguments3;
  var result = fs.readFileSync.apply(fs, $__arguments);
  if (result) {
    result = JSON.parse(result);
  }
  return result;
};
exports.writeJsonFile = function() {
  var $__arguments4 = arguments;
  var $__arguments = $__arguments4;
  var args = $__arguments;
  args[1] = JSON.stringify(args[1]);
  return exports.writeFile.apply(exports, args);
};
exports.writePrettyJsonFile = function() {
  var $__arguments5 = arguments;
  var $__arguments = $__arguments5;
  var args = $__arguments;
  args[1] = JSON.stringify(args[1], null, 4);
  return exports.writeFile.apply(exports, args);
};
var parseYaml = function(content) {
  return YAML.safeLoad(content.toString());
};
var stringifyYaml = YAML.safeDump;
exports.readYamlFile = function() {
  var $__arguments6 = arguments;
  var $__arguments = $__arguments6;
  return exports.readFile.apply(exports, $__arguments).then(parseYaml);
};
exports.readYamlFileSync = function() {
  var $__arguments7 = arguments;
  var $__arguments = $__arguments7;
  var result = fs.readFileSync.apply(fs, $__arguments);
  if (result) {
    result = parseYaml(result);
  }
  return result;
};
exports.writeYamlFile = function() {
  var $__arguments8 = arguments;
  var $__arguments = $__arguments8;
  var args = $__arguments;
  args[2] = stringifyYaml(args[2]);
  return exports.writeFile.apply(exports, args);
};
exports.readRecursiveDirectory = function(dir, options, callback) {
  options = objectUtils.extend({
    recursive: true,
    directories: false
  }, options);
  return exports.readdir(dir).then(function(files) {
    return promiseUtils.forEach(files, function(file) {
      var path = dir + '/' + file;
      return exports.stat(path).then(function(stat) {
        if (stat && stat.isDirectory()) {
          if (options.directories) {
            return callback({
              dirname: file,
              path: path,
              basedir: dir,
              stat: stat
            });
          }
          if (options.recursive) {
            return exports.readRecursiveDirectory(path, options, callback);
          }
        } else {
          return callback({
            filename: file,
            path: path,
            basedir: dir,
            stat: stat
          });
        }
      });
    });
  });
};

//# sourceMappingURL=fs.js.map