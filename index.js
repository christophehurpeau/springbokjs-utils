var S=global.S={
	/* IS */
	
	isStr:function(varName){ return typeof varName === 'string'; },
	isObj:function(varName){ return typeof varName === 'object'; },
	isFunc:function(varName){ return typeof varName === 'function'; },
	isNb:function(varName){ return typeof varName === 'number'; },
	isArray:Array.isArray,
	
	/* utils */
	map:function(arrayOrObject,callback){
		return S.isArray(arrayOrObject) ? arrayOrObject.map(callback) : UObj.map(arrayOrObject,callback);
	},
	join:function(arrayOrObject,separator){
		return S.isArray(arrayOrObject) ? arrayOrObject.join(separator) : UObj.join(arrayOrObject,separator);
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
		UObj.extend(child,classProps);
		
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
		for(var i=1,l=parents.length;i<l;i++) UObj.union(protoProps,parents[i].prototype);
		return S.extClass(parent,protoProps,classProps);
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