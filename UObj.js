global.UObj={
	extend:function(target,object){
		if(object)
			for(var i in object)
				target[i]=object[i];
		return target;
	},
	mextend:function(target){
		var objects=this.aSlice1(arguments),l=objects.length,i,obj,j;
		for(i=0;i<l;i++){
			obj=objects[i];
			for(j in obj)
				target[j]=obj[j];
		}
		return target;
	},
	union:function(target,object){
		if(object)
			for(var i in object)
				if(target[i]===undefined) target[i]=object[i];
		return target;
	},
	clone:function(o){
		return UObj.extend({},o);
	},
	
	forEach:function(o,callback){
		for(var keys=Object.keys(o),length=keys.length,i=0;i<length;i++){
			var k=keys[i];
			callback(k,o[k]);
		}
	},
	implode:function(o,glue,callback){
		if(S.isFunc(glue)){ callback=glue; glue=''; }
		if(!callback) callback=function(k,v){ return v };
		for(var res=keys=Object.keys(o),length=keys.length,i=0;i<length;i++){
			var k=keys[i];
			if(i!==0) res+=glue;
			res+=callback(k,o[k]);
		}
		return res;
	}
}
