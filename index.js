'use strict';
var S = {
	log: (typeof console !== 'undefined' && console.log ) || function(){},
	toInt:function(arg){ return parseInt(arg,10); },
	
    /* IS */
    
    isString: function(varName){ return typeof varName === 'string'; },
    isObject: function(varName){ return typeof varName === 'object'; },
    isFunction: function(varName){ return typeof varName === 'function'; },
    isNumber: function(varName){ return typeof varName === 'number'; },
    isArray: Array.isArray,
    
    /* utils */
    
    iterator: function(iterable) {
        if (Array.isArray(iterable)) {
            return S.array.iterator(iterable);
        }
        var iterator = iterable.iterator();
        if (S.isFunction(iterator.hasNext)) {
            return iterator;
        }

        var nextValue, hasNext=true;
        var next = function(){
            try {
                nextValue = iterator.next();
            } catch(StopIteration) {
                hasNext = false;
                nextValue = undefined;
            }
        };
        next();
        return Object.freeze({
            hasNext: function(){
                return hasNext;
            },
            next: function(){
                var currentValue = nextValue;
                next();
                return currentValue;
            }
        });
    },
    
    asyncWhile: function(nextCallback, forEachCallback, endCallback) {
        (function _while(err) {
            if (err) {
                return endCallback(err);
            }
            nextCallback(function(next) {
                if (next) {
                    forEachCallback(next, _while);
                } else {
                    endCallback();
                }
            });
        })();
    },


	/* IS */
	
    /* HTML */
    escape: function(html) {
        return String(html)
            .replace(/&(?!\w+;)/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    },
    escapeUrl: function(html) {
        return html.replace(/&/g,'&amp;');
    },
    
    regexpEscape: function(s) {
        return s.replace( /([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1" );
    }
};
//S.Class=S.extClass(Object);

'filter find findIndex forEach join map reduce reduceRight some'.split(' ').forEach(function(methodName) {
    S[methodName] = function(arrayOrObject) {
        var args = Array.prototype.slice.call(arguments, 1);
        var method = arrayOrObject[methodName];
        if (!method) {
            method = S.object[methodName];
            args.unshift(arrayOrObject);
        }
        return method.apply(null, args);
    };
});

/**
 * Create a new object library
 * @param {Function} fn
 * @return {Object}
 */
S.newLibrary = function(fn) {
    var lib = {};
    Object.defineProperty(lib, 'defineProperties', { value: S.defineProperties.bind(null, lib) });
    if (fn) {
        fn(lib);
    }
    return lib;
};

/**
 * Freeze a library
 * @param {Object} lib
 * @return {Object}
 */
S.freezeLibrary = function(lib) {
    Object.freeze(lib);
    return lib;
};




/**
 * Create a new class
 * @param {function} fn
 * @return {function}
 */
S.newClass = function(fn) {
    return S.extendClass(Object, fn);
};


S.extendThis = function(fn) {
    return S.extendClass(this, fn);
};

S.extendClass = function(parent, fn) {
    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    var child = function() {
        this.construct.apply(this, arguments);
    };
    /*
        in constructor when mixins :
        if (mixins) {
            mixins.forEach(function(mixin){
                mixin.call(this);
            }.bind(this));
        }
    */

    // Set the prototype chain to inherit from `parent`, without calling `parent`'s constructor function.
    // + Set a convenience property in case the parent's prototype is needed later.
    child.prototype = Object.create(child.super_ = parent.prototype);
    if (!child.prototype.construct) {
        child.prototype.construct = function() {
            if (child.super_.construct) {
                child.super_.construct.apply(this, arguments);
            }
        };
    }
    Object.defineProperty(child, 'superConstruct', { value: function() {
        return child.super_.construct.apply(this, arguments);
    } });
    Object.defineProperty(child.prototype, 'self', { value: child });
    Object.defineProperty(child, 'extend', { configurable: true, value: S.extendThis });
    Object.defineProperty(child, 'extendPrototype', { value: S.extendPrototype.bind(null, child) });
    Object.defineProperty(child, 'defineProperties', { value: S.defineProperties.bind(null, child) });
    Object.defineProperty(child, 'defineProperty', { value: S.defineProperty.bind(null, child) });

    if (fn) {
        if (S.isObject(fn)) {
            child.extendPrototype(fn);
        } else {
            fn(child, parent);
        }
    }

    // Add mixins
    /*
    if (mixins) {
        mixins.forEach(function(mixin){
            S.mixin(child, mixin);
        }.bind(this));
    }*/

    return child;
};

S.defineProperty = function(targetObject, property, value, writable, configurable) {
    Object.defineProperty(targetObject, property, { value: value, writable: !!writable, configurable: !!configurable });
};

S.defineProperties = function(targetObject, properties, writable, configurable) {
    if (properties) {
        writable = !!writable;
        configurable = !!configurable;
        for (var k in properties) {
            if (k === 'writable') {
                S.defineProperties(targetObject, properties[k], true);
            } else if (k === 'configurable') {
                S.defineProperties(targetObject, properties[k], false, true);
            } else {
                Object.defineProperty(targetObject, k,{ value: properties[k], writable: writable, configurable: configurable });
            }
        }
    }
    return targetObject;
};


S.extendPrototype = function(targetClass, methods, writable) {
    S.defineProperties(targetClass.prototype, methods, writable);
    return targetClass;
};

module.exports = S;

S.array = require('./array.js');
S.object = require('./object.js')
S.string = require('./string/string.js');
S.date = require('./date.js');
