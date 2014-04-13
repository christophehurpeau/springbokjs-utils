var string = require('./string.js');

/* http://phpjs.org/functions/strip_tags:535 */
string.stripTags = function(s, allowed) {
	allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
		commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi,
		/*  http://www.tutorialchip.com/tutorials/html5-block-level-elements-complete-list/ */
		blockTags='article,aside,blockquote,br,dd,div,dl,dt,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,li,menu,nav,ol,output,p,pre,section,table,tbody,textarea,tfoot,th,thead,tr,ul'.split(',');
	return s.replace(commentsAndPhpTags, '').replace(tags,function($0,$1){
		var tag=$1.toLowerCase();
		return allowed.indexOf('<' + tag + '>') > -1 ? $0 : UArray.has(blockTags,tag) ? "\n":'';
	}).replace(/\n+\s*\n*/,"\n");
};

string.nl2br = function(s) {
    return s.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ '<br />' +'$2');
};
string.br2nl = function(s) {
    return s.replace(/<br\s*\/?>/mg,'\n');
};

module.exports = string;