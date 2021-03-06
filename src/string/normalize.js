/**
 * @module string
 */
var utils = require('../index');
var exports = require('./string');
module.exports = exports;

/**
 * Transliterate a string
 *
 * @param {String} string
 * @return {String}
 */
export var translit = function(string) {
    return [
        [/æ|ǽ/g, 'ae'],
        [/œ/g, 'oe'], [/Œ/g, 'OE'],
        [/Ä|À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ/g, 'A'], [/ä|à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª/g, 'a'],
        [/Ç|Ć|Ĉ|Ċ|Č/g, 'C'], [/ç|ć|ĉ|ċ|č/g, 'c'],
        [/Ð|Ď|Đ/g, 'D'], [/ð|ď|đ/g, 'd'],
        [/È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě|€/g, 'E'], [/è|é|ê|ë|ē|ĕ|ė|ę|ě/g, 'e'],
        [/Ĝ|Ğ|Ġ|Ģ/g, 'G'], [/ĝ|ğ|ġ|ģ/g, 'g'],
        [/Ĥ|Ħ/g, 'H'], [/ĥ|ħ/g, 'h'],
        [/Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ/g, 'I'], [/ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı/g, 'i'],
        [/Ĵ/g, 'J'], [/ĵ/g, 'j'],
        [/Ķ/g, 'K'], [/ķ/g, 'k'],
        [/Ĺ|Ļ|Ľ|Ŀ|Ł/g, 'L'], [/ĺ|ļ|ľ|ŀ|ł/g, 'l'],
        [/Ñ|Ń|Ņ|Ň/g, 'N'], [/ñ|ń|ņ|ň|ŉ/g, 'n'],
        [/Ö|Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ/g, 'O'], [/ö|ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º|°/g, 'o'],
        [/Ŕ|Ŗ|Ř/g, 'R'], [/ŕ|ŗ|ř/g, 'r'],
        [/Ś|Ŝ|Ş|Š/g, 'S'], [/ś|ŝ|ş|š|ſ/g, 's'],
        [/Ţ|Ť|Ŧ/g, 'T'], [/ţ|ť|ŧ/g, 't'],
        [/Ü|Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ/g, 'U'], [/ü|ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ/g, 'u'],
        [/Ý|Ÿ|Ŷ/g, 'Y'], [/ý|ÿ|ŷ/g, 'y'],
        [/Ŵ/g, 'W'], [/ŵ/g, 'w'],
        [/Ź|Ż|Ž/g, 'Z'], [/ź|ż|ž/g, 'z'],
        [/Æ|Ǽ/g, 'AE'],
        [/ß/g, 'ss'],
        [/Ĳ/g, 'IJ'], [/ĳ/g, 'ij'],
        [/ƒ/g, 'f'],
        [/&/g, 'et'],
        [/þ/g, 'th'],
        [/Þ/g, 'TH'],
    ].reduce((string, v) => string.replace(v[0], v[1]), string);
};

/**
 * Normalize a string
 *
 * @param {String} string
 * @return {String}
 */
export var normalize = function(string) {
    return translit(string)
        .replace(/[ \-\'\"\_\(\)\[\]\{\}\#\~\&\*\,\.\;\:\!\?\/\\\\|\`<\>\+]+/g, ' ')
        .trim()
        .toLowerCase();
};

/**
 * Slugify a string
 *
 * @param {String} string
 * @return {String}
 */
export var slugify = function(string, replacement = '-') {
    return translit(string.trim())
        .replace(/([^\d\.])\.+([^\d\.]|$)/g, '$1 $2')
        .replace(/[^a-zA-Z\d\.]/g, ' ') // \w is a-z and _
        .trim()
        .replace(/\s+/g, replacement)
        .replace(new RegExp('^' + utils.regexpEscape(replacement) + '+|' + utils.regexpEscape(replacement) + '+$'), '');
};
