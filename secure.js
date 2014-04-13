var crypto = require('crypto');

module.exports = {
    md5: function(data) {
        var shasum = crypto.createHash('md5');
        shasum.update(data);
        return shasum.digest('base64');
    },
    sha1: function(data) {
        var shasum = crypto.createHash('sha1');
        shasum.update(data);
        return shasum.digest('base64');
    },
    sha512: function(data) {
        var shasum = crypto.createHash('sha512');
        shasum.update(data);
        return shasum.digest('base64');
    }
};
	
