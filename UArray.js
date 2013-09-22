/*#if NODE*/require('./es6/Array.js');/*#/if*/
global.UArray={
	slice1:function(a){ return Array.prototype.slice.call(a,1); }, //we cannot use Array.slice here
	
	has:function(a,searchElement,i){ return Array.prototype.indexOf.call(a,searchElement,i) !== -1; },
	hasAmong:function(a,searchElements,i){
		for(var j=0, l=searchElements.length; j<l ; j++)
			if(Array.prototype.indexOf.call(a,searchElements[j],i) !== -1) return true;
		return false;
	},
	remove:function(a,elt){
		var i=a.indexOf(elt);
		if(i!==-1) return a.splice(i,1);
		return a;
	},
	
	last:function(a){return a[a.length-1]; },//TODO
	
	random:function(a){ return a[Math.floor(Math.random() * a.length)]; },
	
	/* same as Array.forEach but breaks when return true in callback => go see Array.prototype.some */
	
	forEachAsync:function(a,iterator,onEnd){
		/*#if DEV*/
		if(!S.isFunc(iterator)) throw new Error('UArray.forEachAsync: iterator must be a function !');
		if(!S.isFunc(onEnd)) throw new Error('UArray.forEachAsync: onEnd must be a function !');
		/*#/if*/
		var l, i=1,completed=0;
		if(!a || !(l=a.length)) return onEnd();
		
		Array.forEach(a,function(x){
			iterator(x,function(err){
				if (err) {
					onEnd(err);
					onEnd = function () {};
				}else{
					completed++;
					if(completed === l) onEnd(null);
				}
			});
		});
	},
	forEachSeries:function(a,iterator,onEnd,thisArg){
		/*#if DEV*/
		if(!S.isFunc(iterator)) throw new Error('UArray.forEachSeries: iterator must be a function !');
		if(!S.isFunc(onEnd)) throw new Error('UArray.forEachSeries: onEnd must be a function !');
		/*#/if*/
		var l, i=1;
		if(!a || !(l=a.length)) return onEnd();
		
		iterator(a[0],function callback(err){
			if(err) return onEnd(err);
			if(i===l) return onEnd();
			iterator.call(thisArg,a[i++],callback);
		});
	},
	
	iterator:function(a){
		var i=0;
		return Object.freeze({
			hasNext:function(){
				return i < a.length;
			},
			next:function(){
				if ( ! this.hasNext() )
					throw StopIteration;
				
				return i++;
			}
		});
	},
	
	sortF:{
		'':function(a,b){
			if(a < b) return -1;
			if(a > b) return 1;
			return 0;
		},
		'number':function(a,b){
			return a-b;
		},
		'string':function(a,b){
			return a.localeCompare(b);
		}
	},
	
	sortBy:function(a,propName,desc,sortFunc){
		if(S.isString(desc) || S.isFunc(sortFunc)){ sortFunc = desc; desc = undefined; }
		if(!S.isFunc(sortFunc)) sortFunc=UArray.sortF[sortFunc===undefined?'':sortFunc];
		/*#if DEV*/ if(!sortFunc) throw new Error('undefined sortFunc : '+arguments[3]); /*#/if*/
		return a.sort(
			desc ? function(b,a){
				return sortFunc(a[propName],b[propName]);
			} : function(a,b){
				return sortFunc(a[propName],b[propName]);
			});
	},
	
	
	
	findBy:function(a,propName,val){
		var k=UArray.findKeyBy(a,propName,val);
		if(k===false) return k;
		return a[k];
	},
	findKeyBy:function(a,propName,val){
		var res=false;
		a.some(function(v,k){
			if(v[propName] == val){
				res=k;
				return true;
			}
		});
		return res;
	},
	
	removeBy:function(a,propName,val){
		var k=UArray.findKeyBy(a,propName,val);
		if(k!==false) a.splice(k,1);
		return a;
	},
	removeAllBy:function(a,propName,val){
		var k;
		while( (k = UArray.findKeyBy(a,propName,val)) !== false)
			a.splice(k,1);
		return a;
	},
	
	eq:function(a1,a2){
		if(!S.isArray(a2) || a1.length != a2.length) return false;
		for (var i = 0; i < a2.length; i++) {
			/*if (this[i].compare) { 
				if (!this[i].compare(testArr[i])) return false;
			}*/
			if(a1[i] !== a2[i]) return false;
		}
		return true;
	}
};
if(!Array.prototype.iterator) Array.prototype.iterator=function(){ return UArray.iterator(this); };
