var string = require('./string.js');

string.countWords = function(s) {
	var t = s.replace(/\.\.\./g, ' ') // convert ellipses to spaces
		.replace(/[0-9.(),;:!?%#$?\'\"_+=\\\/-]*/g,'') // remove numbers and punctuation
		;
	var wordArray = t.match(/[\w\u2019\'\-]+/g); //u2019 == &rsquo;
	if (wordArray){
        return wordArray.length;
    }
	return 0;
};
/*
UString.countHtmlWords=function(s){
	return UString.countWords(s.replace(/<.[^<>]*?>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ') // remove html tags and space chars
			.replace(/(\w+)(&.+?;)+(\w+)/, "$1$3").replace(/&.+?;/g, ' '));
};
*/