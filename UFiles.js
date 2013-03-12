/* NODE */
var fs=require('fs');

global.UFiles={
	getJsonSync:function(file){ return JSON.parse(fs.readFileSync(file)); }
};
/* /NODE */