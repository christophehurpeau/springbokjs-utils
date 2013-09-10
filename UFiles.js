/*#if NODE*/
var fs=require('fs'),YAML=require('js-yaml');

global.UFiles={
	existsSync:function(file){
		return fs.existsSync(file);
	},
	readSync:function(file){
		return fs.readFileSync(file,'UTF-8');
	},
	readJsonSync:function(file){
		return JSON.parse(fs.readFileSync(file,'UTF-8'));
	},
	readYamlSync:function(file){
		var content = fs.readFileSync(file,'UTF-8');
		if(!content) return false;
		console.log(YAML.load(content.replace(/\t/g,' ')));
		return YAML.load(content.replace(/\t/g,' '));
	},
	readYamlAsync:function(file,callback){
		fs.readFile(file,'UTF-8',function(err,content){
			if(err || !content) return callback(false);
			callback(YAML.load(content.replace(/\t/g,' ')));
		});
	}
};
/*#/if*/