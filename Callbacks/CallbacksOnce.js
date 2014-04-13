var CallbacksOnce = function(){};
CallbacksOnce.prototype = {
	add: function(listener){
		var events = this._callbacks || (this._callbacks = []);
		if(UArray.has(callbacks,listener)) return this;
		this._callbacks.push(listener);
		return this;
	},
	remove: function(listener){
		var i;
		if(this._callbacks && (i=this._callbacks.indexOf(listener)))
			this._callbacks.splice(i,1);
		return this;
	},
	fire: function(args){
		/*if(this._events[event]){
			args = UArray.slice1(arguments);
			for(var i=0,events=this._events[event],l=events.length; i<l; i++)
				events[i].apply(this,args);
		}*/
		if(this._callbacks && this._callbacks.length!==0){
			var i = this._callbacks.length,response;
			while(i--){
				response = this._callbacks[i].apply(null,args);
				if(response===false) break;
			}
		}
		return this;
	}
};
module.exports = CallbacksOnce;