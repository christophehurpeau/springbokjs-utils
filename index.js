var S=global.S={
	/* IS */
	
	isStr:function(varName){ return typeof varName === 'string'; },
	isObj:function(varName){ return typeof varName === 'object'; },
	isFunc:function(varName){ return typeof varName === 'function'; },
	isNb:function(varName){ return typeof varName === 'number'; },
	isArray:Array.isArray,
	
	/* Objects */
	
	extObj:function(target,object){
		if(object)
			for(var i in object)
				target[i]=object[i];
		return target;
	},
	extObjs:function(target){
		var objects=this.aSlice1(arguments),l=objects.length,i,obj,j;
		for(i=0;i<l;i++){
			obj=objects[i];
			for(j in obj)
				target[j]=obj[j];
		}
		return target;
	},
	oUnion:function(target,object){
		if(object)
			for(var i in object)
				if(target[i]===undefined) target[i]=object[i];
		return target;
	},
	oClone:function(o){
		return S.extObj({},o);
	},
	
	oForEach:function(o,callback){
		for(var keys=Object.keys(o),length=keys.length,i=0;i<length;i++){
			var k=keys[i];
			callback(k,o[k]);
		}
	},
	oImplode:function(o,glue,callback){
		if(S.isFunc(glue)){ callback=glue; glue=''; }
		if(!callback) callback=function(k,v){ return v };
		var res=keys=Object.keys(o),length=keys.length,i=0;
		for(;i<length;i++){
			var k=keys[i];
			if(i!==0) res+=glue;
			res+=callback(k,o[k]);
		}
		return res;
	},
	
	/* Inheritance & Classes */
	
	extProto:function(targetclass,methods){
		if(methods)
			for(var i in methods)
				targetclass.prototype[i]=methods[i];
		return targetclass;
	},
	
	extChild:function(child,parent,protoProps){
		// Set the prototype chain to inherit from `parent`, without calling `parent`'s constructor function.
		// + Set a convenience property in case the parent's prototype is needed later.
		child.prototype=Object.create(child.super_ = parent.prototype);
		child.superCtor = parent;
		
		// Add prototype properties (instance properties) to the subclass,
		// if supplied.
		S.extProto(child,child._inheritsproto_=protoProps);
		
		return child;
	},
	
	
	/* http://backbonejs.org/backbone.js */
	inherits:function(parent,protoProps,classProps){
		// The constructor function for the new subclass is either defined by you
		// (the "constructor" property in your `extend` definition), or defaulted
		// by us to simply call the parent's constructor.
		var child = protoProps && protoProps.hasOwnProperty('ctor') ?
				protoProps.ctor
				: function(){ parent.apply(this,arguments); };
		S.extChild(child,parent,protoProps,classProps);
		
		// Add static properties to the constructor function, if supplied.
		S.extObj(child,classProps);
		
		child.prototype.self = child;
		//child.prototype.super_ = child.super_;
		//child.prototype.superCtor = parent;
		
		return child;
	},
	
	extThis:function(protoProps,classProps){ return S.extClass(this,protoProps,classProps); },
	extClass:function(parent,protoProps,classProps){
		var child = S.inherits(parent,protoProps,classProps);
		child.extend = S.extThis;
		return child;
	},
	extClasses:function(parents,protoProps,classProps){
		var parent=parents[0];
		for(var i=1,l=parents.length;i<l;i++) S.oUnion(protoProps,parents[i].prototype);
		return S.extClass(parent,protoProps,classProps);
	},
	
	/* STRING */
	
	sLcFirst:function(str){ return str.charAt(0).toLowerCase() + str.substr(1); },
	sUcFirst:function(str){ return str.charAt(0).toUpperCase() + str.substr(1); },
	sStartsWith:function(s, prefix) { return s.indexOf(prefix) === 0; },
	sEndsWith:function(s, suffix){
		var l = s.length - suffix.length;
		return l >= 0 && s.indexOf(suffix, l) === l;
	},
	sHas:function(s, s2){ return s.indexOf(s2) !== -1; },
	sIsEmpty:function(s){ return /^\s*$/.test(s); },
	sSplitLeft:function(s,delimiter){
		var pos=s.indexOf(delimiter);
		if(pos===-1) return false;
		return [s.substr(0,pos),s.substr(pos+delimiter.length)];
	},
	sTrim:function(s, pattern){
		return s.replace(new RegExp('^'+pattern+'|'+pattern+'$','g'),'');
	},
	sLtrim:function(s, pattern){
		if(pattern === undefined) pattern = '\\s+';
		return s.replace(new RegExp('^' + pattern, 'g'), '');
	},
	sRtrim:function(s, pattern){
		if(pattern === undefined) pattern = '\\s+';
		return s.replace(new RegExp(pattern + '$', 'g'), '');
	},
	sRepeat:function(s,count){
		//return new Array(count + 1).join(s);
		if(count < 1) return '';
		/* Growing pattern : http://jsfiddle.net/disfated/GejWV/ */
		var result = '',pattern=s.valueOf();
		while(count > 0){
			if (count & 1) result += pattern;
			count >>= 1, pattern += pattern;
		}
		return result;
	},
	sFormat:function(s) {
		return S.sVFormat(s, S.aSlice1(arguments));
	},
	sVFormat:function(s, args) {
		var number=0;
		return s.replace(/%s/g, function(m) { return args[number++] || ''; });
	},
	
	sTranslit:function(s){
		[
			[/æ|ǽ/,'ae'],
			[/œ/,'oe'], [/Œ/,'OE'],
			[/Ä|À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ/,'A'], [/ä|à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª/,'a'],
			[/Ç|Ć|Ĉ|Ċ|Č/,'C'], [/ç|ć|ĉ|ċ|č/,'c'],
			[/Ð|Ď|Đ/,'D'], [/ð|ď|đ/,'d'],
			[/È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě|€/,'E'], [/è|é|ê|ë|ē|ĕ|ė|ę|ě/,'e'],
			[/Ĝ|Ğ|Ġ|Ģ/,'G'], [/ĝ|ğ|ġ|ģ/,'g'],
			[/Ĥ|Ħ/,'H'], [/ĥ|ħ/,'h'],
			[/Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ/,'I'], [/ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı/,'i'],
			[/Ĵ/,'J'], [/ĵ/,'j'],
			[/Ķ/,'K'], [/ķ/,'k'],
			[/Ĺ|Ļ|Ľ|Ŀ|Ł/,'L'], [/ĺ|ļ|ľ|ŀ|ł/,'l'],
			[/Ñ|Ń|Ņ|Ň/,'N'], [/ñ|ń|ņ|ň|ŉ/,'n'],
			[/Ö|Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ/,'O'], [/ö|ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º|°/,'o'],
			[/Ŕ|Ŗ|Ř/,'R'], [/ŕ|ŗ|ř/,'r'],
			[/Ś|Ŝ|Ş|Š/,'S'], [/ś|ŝ|ş|š|ſ/,'s'],
			[/Ţ|Ť|Ŧ/,'T'], [/ţ|ť|ŧ/,'t'],
			[/Ü|Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ/,'U'], [/ü|ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ/,'u'],
			[/Ý|Ÿ|Ŷ/,'Y'], [/ý|ÿ|ŷ/,'y'],
			[/Ŵ/,'W'], [/ŵ/,'w'],
			[/Ź|Ż|Ž/,'Z'], [/ź|ż|ž/,'z'],
			[/Æ|Ǽ/,'AE'],
			[/ß/,'ss'],
			[/Ĳ/,'IJ'], [/ĳ/,'ij'],
			
			[/ƒ/,'f'],
			[/&/,'et'],
			
			[/þ/,'th'],
			[/Þ/,'TH'],
		].forEach(function(v){ s=s.replace(v[0],v[1]); });
		return s;
	},
	sNormalize:function(s){
		return S.sTranslit(s).replace(/[ \-\'\"\_\(\)\[\]\{\}\#\~\&\*\,\.\;\:\!\?\/\\\\|\`\<\>\+]+/,' ')
					.trim().toLowerCase();
	},
	sSlug:function(s,replacement){
		if(replacement===undefined) replacement='-';
		return S.sTranslit(s.trim())
			.replace(/([^\d\.])\.+([^\d\.]|$)/g,'$1 $2')
			.replace(/[^\w\d\.]/g,' ')
			.trim()
			.replace(/\s+/g,replacement)
			.replace(new RegExp('^'+S.regexpEscape(replacement)+'+|'+S.regexpEscape(replacement)+'+$'),'');
	},
	
	/* ARRAY */
	
	ASlice:Array.prototype.slice,
	aSlice1:function(a){ return S.ASlice.call(a,1); },
	aIdxOf:function(a,searchElement,i){
		/*if(a.indexOf) */return a.indexOf(searchElement,i);
		/*var l=a.length;
		i=i ? i < 0 ? Math.max( 0, l + i ) : i : 0;
		for(; i < l; i++ )
			if(i in a && a[i] === searchElement) return i;
		return -1;*/
	},
	aHas:function(a,searchElement,i){ return a.indexOf(searchElement,i) !== -1; },
	aHasAmong:function(a,searchElements,i){
		for(var j=0, l=searchElements.length; j<l ; j++)
			if(a.indexOf(searchElements[j],i) !== -1) return true;
		return false;
	},
	aRemove:function(a,elt){
		var i=a.indexOf(elt);
		if(i) return a.splice(i,1);
		return a;
	},
	aLast:function(a){return a[a.length-1]},//TODO 
	
	aSortF:{
		'':function(a,b){
			if(a < b) return -1;
			if(a > b) return 1;
			return 0;
		}
	},
	
	aSortBy:function(a,propName,desc,sortFunc){
		if(!S.isFunc(sortFunc)) sortFunc=S.aSortF[sortFunc===undefined?'':sortFunc];
		return a.sort(function(a,b){
			if(desc){ var c=a; a=b; b=c; } 
			return sortFunc(a[propName],b[propName]);
		});
	},
	
	/* HTML */
	escape:function(html){
		return String(html)
			.replace(/&(?!\w+;)/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	},
	escapeUrl:function(html){
		return html.replace('&','&amp;');
	},
	
	regexpEscape:function(s){
		return s.replace( /([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1" );
	}
};
//S.Class=S.extClass(Object);
/* NODE */
module.exports=S;
/* /NODE */