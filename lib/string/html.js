"use strict";

/**
 * @module string
 */
var exports = require("./string");
module.exports = exports;

/* http://phpjs.org/functions/strip_tags:535 */
/**
 * Strip html tags from a string, trying to keep newlines consistent
 * @param {String} s
 * @param {String} allowed list of allowed tags, separated by space
 * @return {String}
 */
var stripTags = exports.stripTags = function (s, allowed) {
  allowed = (allowed || "").toLowerCase().split(" ");
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  /*  http://www.tutorialchip.com/tutorials/html5-block-level-elements-complete-list/ */
  var blockTags = ("article aside blockquote br dd div dl dt embed fieldset figcaption figure footer form" + " h1 h2 h3 h4 h5 h6 header hgroup hr li menu nav ol output p pre" + " section table tbody textarea tfoot th thead tr ul").split(" ");
  return s.replace(commentsAndPhpTags, "").replace(tags, function ($0, tag) {
    tag = tag.toLowerCase();
    return allowed.indexOf(tag) !== -1 ? $0 : blockTags.indexOf(tag) !== -1 ? "\n" : "";
  }).replace(/\s*\n+\s*\n*/g, "\n").trim();
};

/**
 * Transform new lines (\r?\n) to br
 *
 * @param {String} string
 * @return {String}
 */
var nl2br = exports.nl2br = function (string) {
  return string.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br>$2");
};

/**
 * Transform <br> to new lines
 *
 * @param {String} string
 * @return {String}
 */
var br2nl = exports.br2nl = function (string) {
  return string.replace(/<br\s*\/?>/g, "\n");
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
//# sourceMappingURL=../string/html.js.map