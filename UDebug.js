global.UDebug={
	stack:function(){
		try{throw new Error();}catch(err){ console.log(err.stack); }
	}
};