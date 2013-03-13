global.UDebug={
	stack:function(){
		try{throw new Error();}catch(err){ console.log(err.stack); }
	},
	dump:function(o){
		/* NODE */
		return require('util').inspect(o);
		/* /NODE */
		//TODO
		
	}
};