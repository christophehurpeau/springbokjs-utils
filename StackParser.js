/* https://github.com/scaryzet/node-stack-parser/blob/master/index.js */
/* (The MIT License)

Copyright (c) 2012 Ivan Zhidkov <scaryzet@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @class
 * @constructor
 */
var StackItem = function() {
	this.what = '[unknown]';
	this.file = '[unknown]';
	this.line = '[unknown]';
	this.column = '[unknown]';
};

/**
 * Supported placeholders are:
 *   %what or %w
 *   %file or %f
 *   %line or %l
 *   %column or %c
 *
 * Default format (when undefined or empty) is "%w, file: %f, line: %l, column: %c".
 *
 * @param {String} format
 */
StackItem.prototype.format = function(format) {
	if (!format)
		return this.what + ', file: ' + this.file + ', line: ' + this.line + ', column: ' + this.column;

	var replacements = [
		[ /%what|%w/ig, this.what ],
		[ /%file|%f/ig, this.file ],
		[ /%line|%l/ig, this.line ],
		[ /%column|%c/ig, this.column ]
	];

	replacements.forEach(function(replacement) {
		format = format.replace(replacement[0], replacement[1]);
	});

	return format;
};

/**
 * @param {String} stack
 * @return {Array} of StackItem
 */
var parse = function(stack) {
	var items = [];
	var lines = stack.match(/^\s+at.*$/mg);

	lines.forEach(function(line) {
		line = line.replace(/^\s*at\s*/, '');
		var m = line.match(/^(.*?)\s+\(([^)]+):(\d+):(\d+)\)$/);

		if (!m) {
			m = line.match(/^(.*?):(\d+):(\d+)$/);

			if (m)
				m.splice(1, 0, null);
		}

		var item = new StackItem();

		if (m) {
			// m: [ match, what, file, line, column ]
			item.what = m[1];
			item.file = m[2];
			item.line = m[3];
			item.column = m[4];
			items.push(item);
		} else {
			item.what = line;
			items.push(item);
		}
	});

	return items;
};

/**
 * Returns the current stack (taken from where here() is called).
 *
 * @return {Array} of StackItem
 */
var here = function() {
	var items = parse((new Error()).stack);
	items.shift();
	return items;
};

module.exports.parse = parse;
module.exports.here = here;
