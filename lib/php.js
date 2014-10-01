"use strict";
var S = require('./index');
var phpUtils = {
  exportCode: function exportCode(v, ifEmptyArray) {
    var content = this._exportCode(v, true);
    if (ifEmptyArray !== undefined && (content === 'false' || content === 'array()')) {
      return ifEmptyArray;
    }
    return content;
  },
  _exportCode: function _exportCode(v, start) {
    if (v === null || !S.isObject(v)) {
      return phpUtils._exportCodeVar(v);
    }
    var content = 'array(';
    if (S.isArray(v)) {
      for (var i = 0,
          l = v.length; i < l; i++) {
        content += this._exportCode(v[i]) + ',';
      }
    } else {
      for (var k in v) {
        content += this._exportCodeVar(k) + '=>' + this._exportCode(v[k]) + ',';
      }
    }
    if (content) {
      content = content.replace(/,+$/, '');
    }
    content += start ? ')' : '),';
    return content;
  },
  _exportCodeVar: function _exportCodeVar(v) {
    if (S.isString(v)) {
      return phpUtils.exportString(v);
    }
    if (v === undefined || v === null) {
      return 'null';
    }
    if (v === true) {
      return 'true';
    }
    if (v === false) {
      return 'false';
    }
    return v;
  },
  exportString: function exportString(str) {
    if (!str.contains("'")) {
      return "'" + str + "'";
    }
    if (!str.contains('"')) {
      return '"' + str.replace(/\$/g, '$') + '"';
    }
    if (str.contains("\n") || str.contains("\r") || str.contains("\t") || str.contains("\v") || str.contains("\f")) {
      return '"' + str.replace(/\\/g, '\\\\').replace(/\n/g, '\n').replace(/\r/g, '\r').replace(/\t/g, '\t').replace(/\v/g, '\v').replace(/\f/g, '\f').replace(/\$/, '$') + '"';
    }
    return "'".str.replace(/\\\'/g, '\'').replace(/\\\\\'/, '\\\'') + "'";
  }
};
module.exports = phpUtils;

//# sourceMappingURL=php.js.map