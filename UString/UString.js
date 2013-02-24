/* http://kangax.github.com/es5-compat-table/es6/ */
(function(){ //ES6
	if(!String.prototype.contains) String.prototype.contains=function(str){return this.indexOf(str)!==-1};
	if(!String.prototype.startsWith) String.prototype.startsWith=function(str,pos){return this.indexOf(str,pos)===0};
	if(!String.prototype.endsWith) String.prototype.endsWith=function(str,pos){ var d=this.length-str.length; return d >= 0 && this.indexOf(pattern,d)===d; };
	
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
		var result = '',pattern=s.valueOf();
		while(count > 0){
			if (count & 1) result += pattern;
			count >>= 1, pattern += pattern;
		}
		return result;
	}
	
})();

global.UString={
	lcFirst:function(str){ return str.charAt(0).toLowerCase() + str.substr(1); },
	ucFirst:function(str){ return str.charAt(0).toUpperCase() + str.substr(1); },
	
	trim:function(str,pattern){ return str.replace(new RegExp('^'+pattern+'|'+pattern+'$','g'),''); },
	trimLeft:function(str,pattern){ return this.replace(new RegExp('^'+pattern,'g'),'');},
	
	isEmpty:function(str){ return /^\s*$/.test(this) },
	
	
	substrFirst:function(str,needle){
		var pos=str.indexOf(needle);
		if(pos===-1) return false;
		return str.substr(0,pos);
	},
	substrLast:function(str,needle){
		var pos=str.lastIndexOf(needle);
		if(pos===-1) return false;
		return str.substr(pos+1);
	},
	
	
	splitLeft:function(s,delimiter){
		var pos=s.indexOf(delimiter);
		if(pos===-1) return false;
		return [s.substr(0,pos),s.substr(pos+delimiter.length)];
	},
	
	
	format:function(s){
		return UString.vformat(s, UArray.slice1(arguments));
	},
	vformat:function(s,args){
		var number=0;
		return s.replace(/%s/g, function(m) { return args[number++] || ''; });
	}
	
};
