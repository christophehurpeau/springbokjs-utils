'use strict';
var S = require('./index.js');
var arrayUtils = require('./array.js');

var objectUtils = S.newLibrary();
module.exports = objectUtils;

objectUtils.defineProperties({
    extend: function(target, object) {
        if (object) {
            for (var i in object) {
                target[i] = object[i];
            }
        }
        return target;
    },
    mextend: function(target) {
        var objects = arrayUtils.slice1(arguments), l=objects.length, i, obj, j;
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
                if (target[i] === undefined) {
                    target[i] = object[i];
                }
            }
        }
        return target;
    },
    clone: function(o) {
        return objectUtils.extend({}, o);
    },
    iterator: function(o) {
        if (Array.isArray(o)) {
            return arrayUtils.iterator(o);
        }
        var keys = Object.keys(o), i=0;
        return Object.freeze({
            hasNext: function() {
                return i < keys.length;
            },
            next: function() {
                if (!this.hasNext()) {
                    throw StopIteration;
                }
                return [ keys[i], o[keys[i++]] ];
            }
        });
    },

    filterKeys: function(object, keys) {
        var mappedObject = {};
        keys.forEach(function(k){
            mappedObject[k] = object[k];
        });
        return mappedObject;
    },

    // Array-like function

    filter: function(o, callback, thisArg) {
        Object.keys(o).filter(function(k) {
            return callback.call(thisArg, o[k], k);
        });
    },

    forEach: function(o, callback, thisArg) {
    },
    
    
    implode: function(object, glue, callback) {
        if (S.isFunction(glue)){
            callback=glue;
            glue='';
        }
        if (!callback) {
            callback = function(k, v){
                return v;
            };
        }
        for (var res, keys = Object.keys(object), length = keys.length, i=0 ; i<length ; i++){
            var k = keys[i];
            if (i!==0) {
                res += glue;
            }
            res += callback(k, object[k]);
        }
        return res;
    }
}, false, true);

var _common_object_array = function(propertyName, object, callback, thisArg) {
    if (!thisArg) {
        thisArg = object;
    }
    /*#if DEV*/
    if (object[propertyName]) {
        throw new Error('call ' + propertyName + ' !');
    }
    /*#/if*/
    return Object.keys(object)[propertyName](function(k) {
        return callback.call(thisArg, object[k], k);
    });
};

objectUtils.defineProperties({
    /**
     * The filter() method creates a new object with all elements that pass the test implemented by the provided function.
     * 
     * @param {Object} object
     * @param {Function} callback
     * @param {*=} thisArg
     * @return {Object}
     */
    filter: function(object, callback, thisArg) {
        var keys = _common_object_array.call(null, 'filter', object, callback, thisArg);
        return objectUtils.filterKeys(object, keys);
    },

    /**
     * The find() method returns a value in the object, if an element in the object satisfies the provided testing function. Otherwise undefined is returned.
     * 
     * @param {Object} object
     * @param {Function} callback
     * @param {*=} thisArg
     * @return {*}
     */
    find: function(object, callback, thisArg) {
        var key = this.findIndex.apply(null, arguments);
        return key && object[key];
    },

    /**
     * The findIndex() method returns an key in the object, if an element in the object satisfies the provided testing function. Otherwise undefined is returned.
     * 
     * @param {Object} object
     * @param {Function} callback
     * @param {*=} thisArg
     * @return {String|undefined}
     */
    findIndex: _common_object_array.bind(null, 'find'),

    /**
     * The forEach() method executes a provided function once per object element.
     * 
     * @param {Object} object
     * @param {Function} callback
     * @param {*} thisArg
     * @return {*}
     */
    forEach: _common_object_array.bind(null, 'forEach'),

    /**
     * The join() method joins all elements of an object into a string.
     * 
     * @param {Object} object
     * @param {String} separator
     * @return {String}
     */
    join: function(object, separator) {
        return Object.keys(object).map(function(key) {
            return object[key];
        }).join(separator);
    },

    /**
     * The map() method creates a new object with the results of calling a provided function on every element in this object.
     * 
     * @param {Object} object
     * @param {Function} callback
     * @param {*=} thisArg
     * @return {*}
     */
    map: function(object, callback, thisArg) {
        var mappedObject = {};
        objectUtils.forEach(object, function(value, key) {
            mappedObject[key] = callback.apply(this, arguments);
        });
        return mappedObject;
    },

    /**
     * The reduce() method applies a function against an accumulator and each value of the object (from left-to-right) has to reduce it to a single value.
     * 
     * @param {Object} object
     * @param {Function} callback
     * @param {*=} initialValue
     * @return {*}
     */
    reduce: function(object, callback, initialValue) {
        return Object.keys(object).reduce(function(previousValue, currentValue, index, array) {
            return callback(previousValue, currentValue, array[key], object);
        });
    },

    /**
     * The reduceRight() method applies a function against an accumulator and each value of the object (from right-to-left) as to reduce it to a single value.
     * 
     * @param {Object} object
     * @param {Function} callback
     * @param {*=} initialValue
     * @return {*}
     */
    reduceRight: function(object, callback, initialValue) {
        return Object.keys(object).reduceRight(function(previousValue, currentValue, index, array) {
            return callback(previousValue, currentValue, array[key], object);
        });
    },

    /**
     * The some() method tests whether some element in the object passes the test implemented by the provided function.
     * 
     * @param {Object} object
     * @param {Function} callback
     * @param {*=} thisArg
     * @return {Boolean}
     */
    some: _common_object_array.bind(null, 'some'),
}, false, true);