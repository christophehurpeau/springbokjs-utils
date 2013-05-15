/* NODE */
var fs=require('fs'),YAML=require('js-yaml');

global.UFiles={
	readJsonSync:function(file){ return JSON.parse(fs.readFileSync(file,'UTF-8')); },
	readYamlSync:function(file){
		var content=fs.readFileSync(file,'UTF-8');
		if(!content) return false;
		//if(!content.startsWith('---')) content="---\n"+content;
		return YAML.load(content.replace("\t",' '));
	},
	readYamlAsync:function(file,callback){
		fs.readFile(file,'UTF-8',function(err,content){
			if(err) return callback(err);
			if(!content) return callback(null,false);
			callback(null,YAML.load(content.replace("\t",' ')));
		});
	}
};
/* /NODE */