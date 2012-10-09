var S={
	/* IS */
	
	isStr:function(varName){ return typeof varName === 'string'; },
	isObj:function(varName){ return typeof varName === 'object'; },
	isFunc:function(varName){ return typeof varName === 'function'; },
	
	
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
	oForeach:function(o,callback){
		var keys=Object.keys(o),length=keys.length;
		for(var i=0;i<length;i++){
			var k=keys[i];
			callback(k,o[k]);
		}
	},
	
	/* Inheritance & Classes */
	
	extProto:function(targetclass,methods){
		if(methods)
			for(var i in methods)
				targetclass.prototype[i]=methods[i];
		return targetclass;
	},
	
	
	/* http://backbonejs.org/backbone.js */
	inherits:function(parent,protoProps,classProps){
		// The constructor function for the new subclass is either defined by you
		// (the "constructor" property in your `extend` definition), or defaulted
		// by us to simply call the parent's constructor.
		var child = protoProps && protoProps.hasOwnProperty('ctor') ? protoProps.ctor : 
															function(){ parent.apply(this,arguments); };
		
		// Set the prototype chain to inherit from `parent`, without calling `parent`'s constructor function.
		// + Set a convenience property in case the parent's prototype is needed later.
		child.prototype=Object.create(child.super_ = parent.prototype);
		
		// Add prototype properties (instance properties) to the subclass,
		// if supplied.
		S.extProto(child,protoProps);
		
		// Add static properties to the constructor function, if supplied.
		S.extObj(child,classProps);
		
		// Correctly set child's `prototype.constructor`.
		child.prototype.ctor = child;
		
		// Set a convenience property in case the parent's prototype is needed later.
		//child.super_ = parent.prototype;
		
		return child;
	},
	
	extThis:function(protoProps,classProps){ return S.extClass(this,protoProps,classProps); },
	extClass:function(parent,protoProps,classProps){
		var child = S.inherits(parent,protoProps,classProps);
		child.extend = S.extThis;
		return child;
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
	sTrim:function(s, pattern) {
		return S.sRtrim(S.sLtrim(s, pattern), pattern);
	},
	sLtrim:function(s, pattern) {
		if(pattern === undefined) pattern = '\\s+';
		return s.replace(new RegExp('^' + pattern, 'g'), '');
	},
	sRtrim:function(s, pattern) {
		if(pattern === undefined) pattern = '\\s+';
		return s.replace(new RegExp(pattern + '$', 'g'), '');
	},
	sRepeat:function(s, m) {
		return new Array(m + 1).join(s);
	},
	sFormat:function(s) {
		return S.sVFormat(s, S.aSlice1(arguments));
	},
	sVFormat:function(s, args) {
		var number=0;
		return s.replace(/%s/g, function(m) { return args[number++] || ''; });
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
	aHas:function(a,searchElement,i){ return S.aIdxOf(a,searchElement,i) !== -1; }
};
//S.Class=S.extClass(Object);
module.exports=S;