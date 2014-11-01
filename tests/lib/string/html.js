"use strict";

/* global test */
var assert = require("proclaim");
var expect = assert.strictEqual;
var lib = "../../../lib" + (process.env.TEST_COV && "-cov" || "") + "/";

var stringUtils = require(lib + "string/html");

test("strip tags should strip the tags", function () {
  expect(stringUtils.stripTags("<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i><br>", "i b"), "Kevin\n<b>van</b> <i>Zonneveld</i>");
  expect(stringUtils.stripTags("<p>Kevin <img src=\"someimage.png\" onmouseover=\"someFunction()\">van <i>Zonneveld</i></p>", "p"), "<p>Kevin van Zonneveld</p>");
  expect(stringUtils.stripTags("1 < 5 5 > 1"), "1 < 5 5 > 1");
  expect(stringUtils.stripTags("1 <br/> 1"), "1\n1");
  expect(stringUtils.stripTags("1 <br/> 1", "br"), "1 <br/> 1");
  expect(stringUtils.stripTags("1 <br> 1", "br"), "1 <br> 1");
});


test("nl2br", function () {
  expect(stringUtils.nl2br("test\ntest"), "test<br>\ntest");
});

test("br2nl", function () {
  expect(stringUtils.br2nl("test<br>test"), "test\ntest");
});
//# sourceMappingURL=../string/html.js.map