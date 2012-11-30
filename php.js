var S=require('./index');
module.exports={
	exportCode:function(v,ifEmptyArray){
		var content=this._exportCode(v,true);
		if(ifEmptyArray!==undefined && (content==='false' || content==='array()')) return ifEmptyArray;
		return content;
	},
	_exportCode:function(v,start){
		if(!S.isObj(v)) return this._exportCode_var(v);
		
		var content='array(';
		if(S.isArray(v)){
			for(var i=0,l=v.length; i<l; i++)
				content+=this._exportCode(content,v[i]);
		}else{
			for(var k in v)
				content+=this._exportCode_var(k)+'=>'+this._exportCode(v[k])+',';
		}
		if(content) content=S.sRtrim(content,',');
		content+=start?')':'),';
		return content;
	},
	_exportCode_var:function(v){
		if(S.isStr(v)) return this.exportString(v);
		if(v===undefined || v===null) return 'null';
		if(v===true) return 'true';
		if(v===false) return 'false';
		return v;//numeric
	},
	
	exportString:function(str){
		if(!S.sHas(str,"'")) return "'"+str+"'";
		if(!S.sHas(str,'"')) return '"'+str.replace('$','\$')+'"';
		if(S.sHas(str,"\n") || S.sHas(str,"\r") || S.sHas(str,"\t") || S.sHas(str,"\v") || S.sHas("\f"))
			return '"'+str.replace('\\','\\\\').replace("\n",'\n').replace("\r",'\r').replace("\t",'\t').replace("\v",'\v')
							.replace("\f",'\f').replace('$','\$')+'"';
		return "'".str.replace('\\\'','\'').replace('\\\\\'','\\\'')+"'";
	}
};