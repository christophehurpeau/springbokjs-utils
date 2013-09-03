/* chrome pre-implementation is lacking of the iterator method. Must be activated in prefs (like node --harmony) so most users won't have any implementation '*/
if(global.Set && (!global.Set.prototype.iterator || !global.Set.prototype.clear)) global.Set=null;

global.Set = global.Set || (function(){
	/*#if NODE*/
	//console.log('You should use node --harmony');
	/*#/if*/
	
	var Set=function(iterator){
		this.items = []; this.size = 0;
		if(iterator) iterator.forEach(function(v){
			this.items.push(v);
		}.bind(this));
	};
	Object.defineProperties(Set.prototype,{
		add:{ value:function(v){
			if(!this.has(v)){
				this.size++;
				this.items.push(v);
			}
		} },
		has:{ value:function(v){
			return UArray.has(this.items,v);
		} },
		'delete':{ value:function(v){
			var i=this.items.indexOf(v);
			if(i!==-1){
				this.size--;
				this.items = this.items.slice(i,1);
			}
		} },
		clear:{ value:function(){
			this.size = 0;
			this.items = [];
		} },
		iterator:{ value:function(){
			var it = UArray.iterator(this.items);
			return Object.freeze({
				hasNext:it.hasNext.bind(it),
				next:function(){
					return this.items[it.next()];
				}.bind(this)
			});
		} },
		forEach:{ value:function(callback){
			this.items.forEach.call(this.items,callback,this);
		} },
		toString:{ value: function() {
			return '[Object Set]';
		} }
	});
	return Set;
})();
/* firefox implementation is lacking of the forEach method*/
if(!Set.prototype.forEach)
	/**
	 * Given a callback function and optional context, invoke the callback on all
	 * entries in this Map.
	 *
	 * @param callbackFn {Function}
	 */
	Map.prototype.forEach=function(callbackfn){
		var it=S.iterator(this);
		while(it.hasNext())
			callbackfn.apply(this,it.next());
	};
