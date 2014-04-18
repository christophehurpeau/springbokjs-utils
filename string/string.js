var stringUtils = {
    lcFirst: function(str) {
        return str.charAt(0).toLowerCase() + str.substr(1);
    },
    ucFirst: function(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    },
    
    trim: function(str, pattern) {
        return str.replace(new RegExp('^'+pattern+'|'+pattern+'$','g'),'');
    },
    trimLeft: function(str, pattern) {
        return str.replace(new RegExp('^'+pattern,'g'),'');
    },
    trimRight: function(str, pattern) {
        return str.replace(new RegExp(pattern+'$','g'),'');
    },
    
    isEmpty: function(str) {
        return str.trim()==='';
    },
    
    substrFirst: function(str, needle) {
        var pos = str.indexOf(needle);
        if (pos === -1) {
            return false;
        }
        return str.substr(0,pos);
    },
    substrLast: function(str, needle) {
        var pos = str.lastIndexOf(needle);
        if (pos === -1) {
            return false;
        }
        return str.substr(pos+1);
    },
    
    
    splitLeft: function(s, delimiter) {
        var pos = s.indexOf(delimiter);
        if (pos === -1) {
            return false;
        }
        return [ s.substr(0, pos), s.substr(pos + delimiter.length) ];
    },
    splitRight: function(s, delimiter) {
        var pos = s.lastIndexOf(delimiter);
        if (pos === -1) {
            return false;
        }
        return [ s.substr(0, pos), s.substr(pos + delimiter.length) ];
    },
    explode: function(s, delimiter, limit) {
        var split = s.split(delimiter);
        if (limit >= split.length) {
            return split;
        }
        return split.slice(0,limit-1).concat([ split.slice(limit-1).join(delimiter) ]);
    },
    
    
    format: function(s) {
        return stringUtils.vformat(s, Array.prototype.slice.call(arguments, 1));
    },
    vformat: function(s, args) {
        var i = 0;
        return s.replace(/%s/g, function(m) {
            return args[i++] || '';
        });
    }
};

module.exports = stringUtils;
