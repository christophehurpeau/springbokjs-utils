/**
 * @module array
 */

/**
 * Slice the array by one element
 *
 * @param {Array} array
 * @return {Array}
 */
"use strict";
exports.slice1 = function(array) {
    return Array.prototype.slice.call(array, 1);
};

/**
 * Search if the array has an element.
 * Shortcut for indexOf !== -1
 *
 * @param {Array} array
 * @param {*} searchElement
 * @param {Number} i
 * @return {Boolean}
 */
exports.has = function(array, searchElement, i) {
    return Array.prototype.indexOf.call(array, searchElement, i) !== -1;
};

/**
 * Search if the array has an element among provided elements.
 * Shortcut for indexOf !== -1
 *
 * @param {Array} array
 * @param {Array} searchElements
 * @param {Number} i
 * @return {Boolean}
 */
exports.hasAmong = function(array, searchElements, i) {
    for (var j = 0, l = searchElements.length; j < l ; j++) {
        if (Array.prototype.indexOf.call(array, searchElements[j], i) !== -1) {
            return true;
        }
    }
    return false;
};

/**
 * Remove an element in an array
 *
 * @param {Array} array
 * @param {*} element
 * @return {Boolean}
 */
exports.remove = function(array, element) {
    var index = array.indexOf(element);
    if (index === -1) {
        return false;
    }

    array.splice(index, 1);
    return index;
};

/**
 * Clone an array
 *
 * @param {Array} array
 * @return {Array} cloned array
 */
exports.clone = function(array) {
    return array.slice(0);
};

/**
 * Last element in an array
 *
 * @param {Array} array
 * @return {*} last element
 */
exports.last = function(array) {
    return array[array.length - 1];
};

/**
 * Random element in an array
 *
 * @param {Array} array
 * @return {*} last element
 */
exports.random = function(array) {
    return array[Math.floor(Math.random() * array.length)];
};


/**
 * Sort functions
 *
 * @type {Object}
 */
exports.sortFunctions = {
    '': function(a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    },
    number: function(a, b) {
        return a - b;
    },
    string: function(a, b) {
        return a.localeCompare(b);
    }
};

exports.sortF = exports.sortFunctions;


/**
 * Sorts an array by a property
 *
 * @param {Array} array
 * @param {String} propertyName
 * @param {?Boolean} descending
 * @param {Function|String|undefined} sortFunction
 * @return {Array}
 */
exports.sortBy = function(array, propertyName, descending, sortFunction) {
    if (typeof descending === 'string' || typeof descending === 'function') {
        sortFunction = descending;
        descending = undefined;
    }

    if (typeof sortFunction !== 'function') {
        sortFunction = exports.sortFunctions[sortFunction == null ? '' : sortFunction];
    }

    return array.sort(
        descending ? function(b, a) {
            return sortFunction(a[propertyName], b[propertyName]);
        } : function(a,b){
            return sortFunction(a[propertyName], b[propertyName]);
        });
};


/* findBy: use Array.prototype.find((v) => v.propertyName === value); */
/* findIndexBy: use Array.prototype.findIndex((v) => v.propertyName === value); */



/**
 * The removeAll() method removes all elements
 * that pass the test implemented by the provided function.
 *
 * @param {array} array
 * @param {Function} callback
 * @return {Number} the new array's length
 */
exports.removeWhen = function(array, callback) {
    array.forEach(function(elt, index) {
        if (callback(elt, index)) {
            array.splice(index, 1);
        }
    });
    return array.length;
};



/**
 * Tests if an array equals another
 *
 * @param {array} array1
 * @param {array} array2
 * @return {Boolean}
 */
exports.equals = function(array1, array2) {
    var length = array1.length;
    if (!Array.isArray(array1) || !Array.isArray(array2) || length != array2.length) {
        return false;
    }
    for (var i = 0; i < length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
};

//# sourceMappingURL=array.js.map