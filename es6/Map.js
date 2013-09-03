/* https://github.com/WebReflection/es6-collections */
/* https://raw.github.com/eriwen/es6-map-shim/master/es6-map-shim.js */

/*#if NODE*/
if(!global.Map) console.log('You should use node --harmony');
//NODE current implementation is not really good
global.Map=null;
/*#else*/
/* chrome pre-implementation is lacking of the iterator method. Must be activated in prefs (like node --harmony) so most users won't have any implementation '*/
if(global.Map && (!global.Map.prototype.iterator || !global.Map.prototype.clear)) global.Map=null;
/*#/if*/

global.Map = global.Map || (function(){
	/*#if NODE*/
	//console.log('You should use node --harmony');
	/*#/if*/
	
	var Map=function(iterator){
		this.items = {}; this.size = 0;
		if(iterator) iterator.forEach(function(kv){
			this.items[kv[0]] = kv[1];
		}.bind(this));
	};
	Object.defineProperties(Map.prototype,{
		set:{ value:function(k,v){
			if(!this.items.hasOwnProperty(k))
				this.size++;
			this.items[k]=v;
		} },
		get:{ value:function(k){
			return this.items[k];
		} },
		has:{ value:function(k){
			return this.items.hasOwnProperty(k);
		} },
		'delete':{ value:function(k){
			if(this.items.hasOwnProperty(k)){
				this.size--;
				delete this.items[k];
			}
		} },
		clear:{ value:function(){
			this.size = 0;
			this.items = {};
		} },
		iterator:{ value:function(){
			return UObj.iterator(this.items);
		} },
		forEach:{ value:function(callback){
			UObj.forEach(this.items,callback,this);
		} },
		toString:{ value: function() {
			return '[Object Map]';
		} }
	});
	return Map;
})();
/* firefox implementation is lacking of the forEach method*/
if(!Map.prototype.forEach)
	/**
	 * Given a callback function and optional context, invoke the callback on all
	 * entries in this Map.
	 *
	 * @param callbackFn {Function}
	 */
	Map.prototype.forEach=function(callbackfn){
		/*var iter = this.iterator();
		while(true){
			var current;
			try{ current=iter.next(); }catch(err){ return; }
			callbackfn.call(this,current[0],current[1]);
		}*/
		var it=S.iterator(this);
		while(it.hasNext())
			callbackfn.apply(this,it.next());
	};
