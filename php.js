var S = require('./index');
module.exports = {
    exportCode: function (v, ifEmptyArray) {
        var content = this._exportCode(v, true);
        if (ifEmptyArray!==undefined && (content==='false' || content==='array()')) {
            return ifEmptyArray;
        }
        return content;
    },
    _exportCode: function(v, start) {
        if (!S.isObj(v)) {
            return this._exportCode_var(v);
        }
        
        var content='array(';
        if (S.isArray(v)) {
            for (var i=0, l=v.length ; i<l ; i++) {
                content += this._exportCode(content, v[i]);
            }
        } else {
            for (var k in v) {
                content+=this._exportCode_var(k)+'=>'+this._exportCode(v[k])+',';
            }
        }
        if (content) {
            content = UString.trimRight(content, ',');
        }
        content += start ? ')' : '),';
        return content;
    },
    _exportCode_var: function(v) {
        if(S.isString(v)) return this.exportString(v);
        if(v===undefined || v===null) return 'null';
        if(v===true) return 'true';
        if(v===false) return 'false';
        return v;//numeric
    },
    
    exportString: function(str) {
        if(!str.contains("'")) return "'"+str+"'";
        if(!str.contains('"')) return '"'+str.replace(/\$/g,'\$')+'"';
        if(str.contains("\n") || str.contains("\r") || str.contains("\t") || str.contains("\v") || str.contains("\f"))
            return '"'+str.replace(/\\/g,'\\\\').replace(/\n/g,'\n').replace(/\r/g,'\r').replace(/\t/g,'\t').replace(/\v/g,'\v')
                            .replace(/\f/g,'\f').replace(/\$/,'\$')+'"';
        return "'".str.replace(/\\\'/g,'\'').replace(/\\\\\'/,'\\\'')+"'";
    }
};