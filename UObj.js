global.UObj = {
	extend: function(target, object) {
		if (object) {
			for (var i in object) {
				target[i] = object[i];
            }
        }
		return target;
	},
	mextend: function(target) {
		var objects = this.aSlice1(arguments), l=objects.length, i, obj, j;
		for (i=0; i<l; i++) {
			obj = objects[i];
			for (j in obj) {
				target[j] = obj[j];
            }
		}
		return target;
	},
	union: function(target, object) {
		if (object) {
			for (var i in object) {
				if (target[i]===undefined) {
                    target[i] = object[i];
                }
            }
        }
		return target;
	},
	clone: function(o) {
		return UObj.extend({}, o);
	},
	
	iterator: function(o) {
        if (Array.isArray(o)) {
            return UArray.iterator(o);
        }
		var keys = Object.keys(o), i=0;
		return Object.freeze({
			hasNext: function() {
				return i < keys.length;
			},
			next: function() {
				if ( !this.hasNext() )
					throw StopIteration;
				
				return [ keys[i], o[keys[i++]] ];
			}
		});
	},
	
	forEach: function(o, callback, thisArg) {
		/*#if DEV*/
		if(!S.isFunc(callback)) throw new Error('UObj.forEach: callback must be a function !');
		/*#/if*/
		if(!thisArg) thisArg=o;
		/*#if DEV*/
		if(o.forEach)
			throw new Error('call forEach !');
			/*o.forEach(function(){
				var res=callback && callback.apply(thisArg,arguments);
				if(res===false) callback=false;
			});*/
		else
		/*#/if*/
			Object.keys(o).forEach(function(k) {
				var res=callback && callback.call(thisArg,k,o[k]);
				if(res===false) callback=false;
			});
	},
	
	forEachAsync: function(o, iterator, onEnd) {
		UArray.forEachAsync(Object.keys(o), function(k, onEnd) {
            iterator(k, o[k], onEnd);
        }, onEnd);
	},
	forEachSeries: function(o, iterator, onEnd) {
		UArray.forEachSeries(Object.keys(o), function(k,onEnd) {
            iterator(k, o[k], onEnd);
        }, onEnd);
	},
	
	map: function(o,callback) {
		var mappedO = {};
		Object.keys(o).forEach(function(k) {
            mappedO[k] = callback(o[k], k);
        });
		return mappedO;
	},
	join: function(o, separator) {
		return Object.keys(o).map(function(k) {
            return o[k];
        }).join(separator);
	},
	filterKeys: function(o, keys) {
		var mappedO = {};
		keys.forEach(function(k){
            mappedO[k] = o[k];
        });
		return mappedO;
	},
	
	implode: function(o, glue, callback) {
		if (S.isFunc(glue)){
            callback=glue;
            glue='';
        }
		if (!callback) {
            callback = function(k, v){
                return v;
            };
        }
		for (var res, keys = Object.keys(o), length = keys.length, i=0 ; i<length ; i++){
			var k = keys[i];
			if (i!==0) {
                res += glue;
            }
			res += callback(k, o[k]);
		}
		return res;
	}
};
