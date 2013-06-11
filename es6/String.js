if(!String.prototype.contains) String.prototype.contains=function(str){return this.indexOf(str)!==-1};
if(!String.prototype.startsWith) String.prototype.startsWith=function(str,pos){return this.indexOf(str,pos)===0};
if(!String.prototype.endsWith) String.prototype.endsWith=function(str,pos){ var d=this.length-str.length; return d >= 0 && this.indexOf(str,d)===d; };

if (!String.prototype.trimLeft || !String.prototype.trimRight){
	var ws = "[" + "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
	"\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
	"\u2029\uFEFF"+ "]";
	var trimBeginRegexp = new RegExp("^" + ws + ws + "*"), trimEndRegexp = new RegExp(ws + ws + "*$");
	String.prototype.trimLeft = function(){ return String(this).replace(trimBeginRegexp, ""); };
	String.prototype.trimRight = function(){ return String(this).replace(trimEndRegexp, ""); };
}

if(!String.prototype.repeat) String.prototype.repeat=function(count){
	//return new Array(count + 1).join(this)
	if(count < 1) return '';
	/* Growing pattern : http://jsfiddle.net/disfated/GejWV/ */
	var result = '',pattern=this.valueOf();
	while(count > 0){
		if (count & 1) result += pattern;
		count >>= 1, pattern += pattern;
	}
	return result;
};

/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String */
// Assumes all supplied String instance methods already present (one may use shims for these if not available)
(function () {
    'use strict';

    var i,
        // We could also build the array of methods with the following, but the
        //   getOwnPropertyNames() method is non-shimable:
        // Object.getOwnPropertyNames(String).filter(function (methodName) {return typeof String[methodName] === 'function'});
        methods = [
            /*'quote', */'substring', 'toLowerCase', 'toUpperCase', 'charAt',
            'charCodeAt', 'indexOf', 'lastIndexOf', 'startsWith', 'endsWith',
            'trim', 'trimLeft', 'trimRight', 'toLocaleLowerCase',
            'toLocaleUpperCase', 'localeCompare', 'match', 'search',
            'replace', 'split', 'substr', 'concat', 'slice', 'fromCharCode'
        ],
        methodCount = methods.length,
        assignStringGeneric = function (methodName) {
            var method = String.prototype[methodName];
            String[methodName] = function (arg1) {
                return method.apply(arg1, Array.prototype.slice.call(arguments, 1));
            };
        };

    for (i = 0; i < methodCount; i++) {
        assignStringGeneric(methods[i]);
    }
}());