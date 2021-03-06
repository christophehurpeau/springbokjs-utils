/* jshint maxlen: 200 */
/**
 * fs API with Promises
 *
 *  @module fs
 */

var fs = require('fs');
var promisesUtils = require('./promises');
var YAML = require('js-yaml');

/**
 * Rename a file synchronously
 *
 * @param {String} oldPath
 * @param {String} newPath
 * @return {Boolean}
 */

[
    /**
     * Rename a file
     *
     * @function module:fs.rename
     * @param {String} oldPath
     * @param {String} newPath
     * @return {Promise}
     */
    'rename',
    /**
     * Truncate a file to a specified length
     *
     * @function module:fs.ftruncate
     * @param {FileDescriptor} fd file descriptor
     * @param {Number=} len
     * @return {Promise}
     */
    'ftruncate',
    /**
     * Truncate a file to a specified length
     *
     * @function module:fs.truncate
     * @param {String} path
     * @param {Number=} len
     * @return {Promise}
     */
    'truncate',
    /**
     * Change ownership of a file
     *
     * @function module:fs.chown
     * @param {String} path
     * @param {Number=} len
     * @return {Promise}
     */
    'chown',
    /**
     * Change ownership of a file
     *
     * @function module:fs.fchown
     * @param {FileDescriptor} fd file descriptor
     * @param {Number=} len
     * @return {Promise}
     */
    'fchown',
    /**
     * Change ownership of a file
     * is like chown(), but does not dereference symbolic links.
     *
     * @function module:fs.lchown
     * @param {String} path
     * @param {Number=} len
     * @return {Promise}
     */
    'lchown',
    /**
     * Change permissions of a file
     *
     * Changes the permissions of the file specified whose pathname is given in path,
     * which is dereferenced if it is a symbolic link.
     *
     * @function module:fs.chmod
     * @param {String} path
     * @param {Number=} len
     * @return {Promise}
     */
    'chmod',
    /**
     * Change permissions of a file
     *
     * @function module:fs.fchmod
     * @param {FileDescriptor} fd file descriptor
     * @param {Number=} len
     * @return {Promise}
     */
    'fchmod',
    /**
     * Change permissions of a file
     *
     * @function module:fs.lchmod
     * @param {String} path
     * @param {Number=} len
     * @return {Promise}
     */
    'lchmod',
    /**
     * Get file status
     *
     * @function module:fs.stat
     * @param {String} path
     * @param {Number=} len
     * @return {Promise}
     */
    'stat',
    /**
     * Get file status
     *
     * Identical to stat(), except that if path is a symbolic link,
     * then the link itself is stat-ed, not the file that it refers to.
     *
     * @function module:fs.lstat
     * @param {String} path
     * @param {Number=} len
     * @return {Promise}
     */
    'lstat',
    /**
     * Get file status
     *
     * @function module:fs.fstat
     * @param {FileDescriptor} fd file descriptor
     * @param {Number=} len
     * @return {Promise}
     */
    'fstat',
    /**
     * Make a new name for a file
     *
     * link() creates a new link (also known as a hard link) to an existing file.
     *
     * @function module:fs.stat
     * @param {FileDescriptor} fd file descriptor
     * @param {Number=} len
     * @return {Promise}
     */
    'link',
    /**
     * Make a new name for a file
     *
     * symlink() creates a symbolic link named newpath which contains the string oldpath.
     *
     * @function module:fs.symlink
     * @param {String} oldPath
     * @param {String} newPath
     * @return {Promise}
     */
    'symlink',
    /**
     * Read value of a symbolic link
     *
     * readlink() places the contents of the symbolic link path in the buffer buf,
     * which has size bufsiz. readlink() does not append a null byte to buf.
     * It will truncate the contents (to a length of bufsiz characters),
     * in case the buffer is too small to hold all of the contents.
     *
     * @function module:fs.readlink
     * @param {String} path
     * @return {Promise}
     */
    'readlink',
    /**
     * The callback gets two arguments (err, resolvedPath).
     *
     * May use process.cwd to resolve relative paths. cache is an object literal of mapped paths
     * that can be used to force a specific path resolution or avoid additional fs.stat calls for known real paths.
     *
     * @example
     * var cache = {'/etc':'/private/etc'};
     * fs.realpath('/etc/passwd', cache).then(function(resolvedPath) {
     *   console.log(resolvedPath);
     * });
     *
     * @function module:fs.realpath
     * @param {String} path
     * @return {Promise}
     */
    'realpath',
    /**
     * Delete a name and possibly the file it refers to
     *
     * unlink() deletes a name from the file system.
     *
     * If that name was the last link to a file and no processes have the file open
     * the file is deleted and the space it was using is made available for reuse.
     *
     * If the name was the last link to a file but any processes still have the file open
     * the file will remain in existence until the last file descriptor referring to it is closed.
     *
     * If the name referred to a symbolic link the link is removed.
     *
     * If the name referred to a socket, fifo or device the name for it is removed
     * but processes which have the object open may continue to use it.
     *
     * @function module:fs.unlink
     * @param {String} path
     * @return {Promise}
     */
    'unlink',
    /**
     * Delete a directory
     *
     * rmdir() deletes a directory, which must be empty.
     *
     * @function module:fs.rmdir
     * @param {String} path
     * @return {Promise}
     */
    'rmdir',
    /**
     * Create a directory
     *
     * rmdir() deletes a directory, which must be empty.
     *
     * mkdir() attempts to create a directory named path.
     *
     * The argument mode specifies the permissions to use.
     * It is modified by the process's umask in the usual way:
     * the permissions of the created directory are (mode & ~umask & 0777).
     * Other mode bits of the created directory depend on the operating system. For Linux, see below.
     *
     * @function module:fs.mkdir
     * @param {String} path
     * @param {String|Number=} mode
     * @return {Promise}
     */
    'mkdir',
    /**
     * Reads the contents of a directory.
     * Promise's result where files is an array of the names of the files in the directory excluding '.' and '..'.
     *
     * @function module:fs.readdir
     * @param {String} path
     * @return {Promise}
     */
    'readdir',
    /**
     * No arguments other than a possible exception are given to the completion callback.
     *
     * @function module:fs.close
     * @param {String} path
     * @return {Promise}
     */
    'close',
    /**
     * No arguments other than a possible exception are given to the completion callback.
     *
     * 'r' - Open file for reading. An exception occurs if the file does not exist.
     * 'r+' - Open file for reading and writing. An exception occurs if the file does not exist.
     * 'rs' - Open file for reading in synchronous mode.
     * 		Instructs the operating system to bypass the local file system cache.
     *     	This is primarily useful for opening files on NFS mounts
     *     	as it allows you to skip the potentially stale local cache.
     *      It has a very real impact on I/O performance so don't use this flag unless you need it.
     * 'rs+' - Open file for reading and writing, telling the OS to open it synchronously.
     * 		See notes for 'rs' about using this with caution.
     * 'w' - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
     * 'wx' - Like 'w' but fails if path exists.
     * 'w+' - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
     * 'wx+' - Like 'w+' but fails if path exists.
     * 'a' - Open file for appending. The file is created if it does not exist.
     * 'ax' - Like 'a' but fails if path exists.
     * 'a+' - Open file for reading and appending. The file is created if it does not exist.
     * 'ax+' - Like 'a+' but fails if path exists.
     *
     * mode sets the file mode (permission and sticky bits), but only if the file was created.
     * It defaults to 0666, readable and writeable.
     *
     * The exclusive flag 'x' (O_EXCL flag in open(2)) ensures that path is newly created.
     * On POSIX systems, path is considered to exist even if it is a symlink to a non-existent file.
     * The exclusive flag may or may not work with network file systems.
     *
     * On Linux, positional writes don't work when the file is opened in append mode.
     * The kernel ignores the position argument and always appends the data to the end of the file.
     *
     * @function module:fs.close
     * @param {String} path
     * @param {String} flags
     * @param {String|Number=} mode
     * @return {Promise}
     */
    'open',
    /**
     * Change file last access and modification times
     *
     * The utime() system call changes the access and modification times of the inode specified by filename
     * to the actime and modtime fields of times respectively.
     *
     * If times is NULL, then the access and modification times of the file are set to the current time.
     *
     * Changing timestamps is permitted when: either the process has appropriate privileges,
     * or the effective user ID equals the user ID of the file,
     * or times is NULL and the process has write permission for the file.
     *
     * @function module:fs.utimes
     * @param {String} path
     * @param {String} atime
     * @param {String} mtime
     * @return {Promise}
     */
    'utimes',
    /**
     * Change file last access and modification times
     *
     * The utime() system call changes the access and modification times of the inode specified by filename
     * to the actime and modtime fields of times respectively.
     *
     * If times is NULL, then the access and modification times of the file are set to the current time.
     *
     * Changing timestamps is permitted when: either the process has appropriate privileges,
     * or the effective user ID equals the user ID of the file,
     * or times is NULL and the process has write permission for the file.
     *
     * @function module:fs.futimes
     * @param {FileDescriptor} fd file descriptor
     * @param {String} atime
     * @param {String} mtime
     * @return {Promise}
     */
    'futimes',
    /**
     * Synchronize a file's in-core state with storage device
     *
     * @function module:fs.fsync
     * @param {FileDescriptor} fd file descriptor
     * @return {Promise}
     */
    'fsync',
    /**
     * Write buffer to the file specified by fd.
     *
     * @function module:fs.write
     * @param {FileDescriptor} fd file descriptor
     * @param {*} buffer
     * @param {Number=} offset
     * @param {Number=} length
     * @param {Number=} position
     * @return {Promise}
     */
    'write',
    /**
     * Read data from the file specified by fd.
     *
     * @function module:fs.read
     * @param {FileDescriptor} fd file descriptor
     * @param {*} buffer
     * @param {Number=} offset
     * @param {Number=} length
     * @param {Number=} position
     * @return {Promise}
     */
    'read',
    /**
     * Reads the entire contents of a file.
     *
     * options:
     *     encoding String | Null default = null
     *     flag String default = 'r'
     *
     *
     * If no encoding is specified, then the raw buffer is returned.
     *
     * @example
     * fs.readFile('/etc/passwd').then(function(data) {
     *   console.log(data);
     * });
     *
     * @function module:fs.readFile
     * @param {String} filename
     * @param {Object} options
     * @return {Promise}
     */
    'readFile',
    /**
     * Writes data to a file, replacing the file if it already exists. data can be a string or a buffer.
     *
     * options:
     *     encoding String | Null default = 'utf8'
     *     mode Number default = 438 (aka 0666 in Octal)
     *     flag String default = 'w'
     *
     *
     * If no encoding is specified, then the raw buffer is returned.
     *
     * @example
     * fs.writeFile('message.txt', 'Hello Node').then(function() {
     *   console.log('Ok !');
     * });
     *
     * @function module:fs.writeFile
     * @param {String} filename
     * @param {String|Buffer} data
     * @param {Object=} options
     * @return {Promise}
     */
    'writeFile',
    /**
     * Appends data to a file, creating the file if it not yet exists. data can be a string or a buffer.
     *
     * options:
     *     encoding String | Null default = 'utf8'
     *     mode Number default = 438 (aka 0666 in Octal)
     *     flag String default = 'a'
     *
     *
     * If no encoding is specified, then the raw buffer is returned.
     *
     * @example
     * fs.appendFile('message.txt', 'Hello Node').then(function() {
     *   console.log('Ok !');
     * });
     *
     * @function module:fs.appendFile
     * @param {String} filename
     * @param {String|Buffer} data
     * @param {Object=} options
     * @return {Promise}
     */
    'appendFile',
    /**
     * Test whether or not the given path exists by checking with the file system.
     * The promise result is either true or false.
     *
     * @example
     * fs.exists('/etc/passwd', 'Hello Node').then(function(exists) {
     *   console.log(exists ? "it's there" : "no passwd!");
     * });
     *
     * @function module:fs.exists
     * @param {String} path
     * @return {Promise}
     */
    'exists'
].forEach(function(name) {
    var fsFn = fs[name];
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

/**
 * Read a file and parse its content as JSON
 *
 * @param {String} path
 * @return {Promise}
 */
export var readJsonFile = function() {
    return exports.readFile.apply(exports, arguments)
        .then(JSON.parse);
};

/**
 * Read a file and parse its content as JSON synchronously
 *
 * @param {String} path
 * @return {*}
 */
export var readJsonFileSync = function() {
    var result = fs.readFileSync.apply(fs, arguments);
    return result && JSON.parse(result);
};

export var writeJsonFile = function() {
    var args = arguments;
    args[1] = JSON.stringify(args[1]);
    return exports.writeFile.apply(exports, args);
};

export var writePrettyJsonFile = function() {
    var args = arguments;
    args[1] = JSON.stringify(args[1], null, 4);
    return exports.writeFile.apply(exports, args);
};


var parseYaml = function(content) {
    return YAML.safeLoad(content.toString());
};

var stringifyYaml = YAML.safeDump;

/**
 * Read a file and parse its content as Yaml
 *
 * @param {String} path
 * @return {Promise}
 */
export var readYamlFile = function() {
    return exports.readFile.apply(exports, arguments)
        .then(parseYaml);
};

/**
 * Read a file and parse its content as Yaml synchronously
 *
 * @param {String} path
 * @return {*}
 */
export var readYamlFileSync = function() {
    var result = fs.readFileSync.apply(fs, arguments);
    return result && parseYaml(result);
};

/**
 * Write in file a yaml content
 *
 * @param {String} path
 * @param {*} content
 * @param {Object} options
 * @return {*}
 */
export var writeYamlFile = function() {
    var args = arguments;
    args[1] = stringifyYaml(args[1]);
    return exports.writeFile.apply(exports, args);
};

/**
 * Recursively read a directory.
 * callback is called for each files
 * Return a Promise when all files are read.
 *
 * @param {String} dir
 * @param {Object} options
 * @param {Function} callback
 * @return {Promise}
 */
export var readRecursiveDirectory = function readRecursiveDirectory(dir, options, callback) {
    options = Object.assign({
        recursive: true,
        directories: false,
    }, options);
    return exports.readdir(dir).then((files) => {
        return promisesUtils.forEach(files, (file) => {
            var path = dir + '/' + file;
            return exports.stat(path)
                .then((stat) => {
                    if (stat && stat.isDirectory()) {
                        if (options.directories) {
                            return callback({ dirname: file, path: path, basedir: dir, stat: stat });
                        }
                        if (options.recursive) {
                            return readRecursiveDirectory(path, options, callback);
                        }
                    } else {
                        return callback({ filename: file, path: path, basedir: dir, stat: stat });
                    }
                });
        });
    });
};
