/*#if NODE*/
var _exec=require('child_process').exec;

global.UExec={
	exec:function(cmd,callback){
		_exec(cmd,callback);
	},
	escape:function(arg){
		return '"'+arg.replace(/(["\s'$`\\])/g,'\\$1')+'"';
	}
};
/*#/if*/