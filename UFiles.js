/* NODE */
var fs=require('fs'),YAML=require('js-yaml');

global.UFiles={
	readJsonSync:function(file){ return JSON.parse(fs.readFileSync(file,'UTF-8')); },
	readYamlSync:function(file){
		var content=fs.readFileSync(file,'UTF-8');
		if(!content) return false;
		//if(!content.startsWith('---')) content="---\n"+content;
		return YAML.load(content.replace("\t",' '));
	}
};
/* /NODE */