var S = require('./index.js');

var Listenable = function() {
};

Object.assign(Listenable.prototype, {
    on: function(event,listener){
        if (!this._events) {
            this._events = new Map();
        }
        var callbacks;
        if (!this._events.has(event)) {
            this._events.set(event,callbacks = new Set());
        } else {
            callbacks = this._events.get(event);
        }
        callbacks.add(listener);
        return this;
    },
    once: function(event,listener){
        var t = this;
        t.on(event, function on(){
            t.off(event, on);
            return listener.apply(this, arguments);
        });
        return this;
    },
    off: function(event,listener){
        var callbacks = this.listeners(event);
        if (callbacks) {
            callbacks.remove(listener);
            if (callbaks.size === 0) {
                this._events.delete(event);
            }
        }
        return this;
    },
    fire: function(event/*,args*/){
        /*if(this._events[event]){
            args = UArray.slice1(arguments);
            for(var i=0,events=this._events[event],l=events.length; i<l; i++)
                events[i].apply(this,args);
        }*/
        var callbacks = this.listeners(event);
        if (callbacks) {
            var response, args = S.array.slice1(arguments);
            var it = callbacks.values(), next;
            while ((next = it.hasNext()) && !next.done && response !== false){
                response = next.value.apply(this,args);
            }
        }
        return this;
    },
    listeners: function(event){
        return this._events && this._events.get(event);
    },
    removeEvent: function(event){
        if (event) {
            this._events.delete(event);
        } else {
            this._events.clear();
        }
    },
    removeListener: function(event,listener){
        if (this._events && this._events.has(event)) {
            this._events.get(event).delete(listener);
        }
    },
    dispose: function(){
        delete this._events;
    }
});