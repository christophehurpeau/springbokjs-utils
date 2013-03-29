/* NODE */
var fs=require('fs');

global.UFiles={
	readJsonSync:function(file){ return JSON.parse(fs.readFileSync(file,'UTF-8')); }
};
/* /NODE */