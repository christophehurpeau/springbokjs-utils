"use strict";

/* global test */
var assert = require("proclaim");
var expect = assert.strictEqual;
var lib = "../../../lib" + (process.env.TEST_COV && "-cov" || "") + "/";

require(lib + "string/normalize");
var stringUtils = require(lib + "string/string");


test("translit should transliterate a string", function () {
  expect(stringUtils.translit("ah ah \u00e9\u00e9\u00e9 !"), "ah ah eee !");
});

test("normalize should normalize a string", function () {
  expect(stringUtils.normalize("aAaa \u00e9\u00e9\u00e9 !"), "aaaa eee");
});

test("slugify should create a slug from a string", function () {
  expect(stringUtils.slugify("ah_ah \u00e9\u00e9\u00e9 !"), "ah-ah-eee");
  expect(stringUtils.slugify("ah ah \u00e9\u00e9\u00e9 !", "+"), "ah+ah+eee");
});
//# sourceMappingURL=../string/normalize.js.map