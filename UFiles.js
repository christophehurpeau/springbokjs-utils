/*#if NODE*/
var fsc= require('fs');
var YAML = require('js-yaml');
require('./UObj');

global.UFiles = {
	existsSync: fs.existsSync.bind(fs),
	existsAsync: fs.exists.bind(fs),
	
	readSync: function(file){
		return fs.readFileSync(file,'UTF-8').toString();
	},
	readAsync: function(file, callback){
		return fs.readFile(file, 'UTF-8', function(err, result) {
			if (err) {
                callback(false, err);
            } else {
                callback(result.toString());
            }
		});
	},
	
	readJsonSync: function(file) {
		return JSON.parse(fs.readFileSync(file, 'UTF-8'));
	},
	readYamlSync: function(file) {
		var content = fs.readFileSync(file, 'UTF-8');
		if (!content) {
            return false;
        }
		return YAML.load(content.replace(/\t/g,' '));
	},
	readYamlAsync: function(file, callback) {
		fs.readFile(file, 'UTF-8', function(err, content) {
			if (err || !content) {
                return callback(false);
            }
			callback(YAML.load(content.replace(/\t/g,' ')));
		});
	}
};
/*#/if*/