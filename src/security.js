var crypto = require('crypto');

/**
 * Only for NodeJS
 * 
 * @exports security
 */
module.exports = {
    /**
     * Create an md5 hash
     * 
     * @param {Buffer|String} data
     * @return {String} base64 string
     */
    md5(data) {
        var shasum = crypto.createHash('md5');
        shasum.update(data);
        return shasum.digest('base64');
    },

    /**
     * Create an sha1 hash
     * 
     * @param {Buffer|String} data
     * @return {String} base64 string
     */
    sha1(data) {
        var shasum = crypto.createHash('sha1');
        shasum.update(data);
        return shasum.digest('base64');
    },
    
    /**
     * Create an sha512 hash
     * 
     * @param {Buffer|String} data
     * @return {String} base64 string
     */
    sha512(data) {
        var shasum = crypto.createHash('sha512');
        shasum.update(data);
        return shasum.digest('base64');
    }
};