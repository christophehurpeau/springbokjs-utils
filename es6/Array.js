/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Array_generic_methods */
if(!Array.forEach)
	(function () {
		'use strict';
	
		var i,
			// We could also build the array of methods with the following, but the
			//   getOwnPropertyNames() method is non-shimable:
			// Object.getOwnPropertyNames(Array).filter(function (methodName) {return typeof Array[methodName] === 'function'});
			methods = [
				'join', 'reverse', 'sort', 'push', 'pop', 'shift', 'unshift',
				'splice', 'concat', 'slice', 'indexOf', 'lastIndexOf',
				'forEach', 'map', 'reduce', 'reduceRight', 'filter',
				'some', 'every'
			],
			methodCount = methods.length,
			assignArrayGeneric = function (methodName) {
				var method = Array.prototype[methodName];
				Array[methodName] = function (arg1) {
					return method.apply(arg1, UArray.slice1(arguments));
				};
			};
	
		for (i = 0; i < methodCount; i++) {
			assignArrayGeneric(methods[i]);
		}
	}());