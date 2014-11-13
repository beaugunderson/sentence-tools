'use strict';

var SINGLE_QUOTE = exports.SINGLE_QUOTE = "'";
var DOUBLE_QUOTE = exports.DOUBLE_QUOTE = '"';

exports.normalizeWhitespace = function (sentence) {
  return sentence.replace(/\s+/g, ' ');
};

exports.trim = function (sentence) {
  return sentence.trim();
};

exports.normalizeQuotes = function (text) {
  return text
    .replace(/''|``|’’|‛‛/g, DOUBLE_QUOTE)
    .replace(/'|‘|’|‛/g, SINGLE_QUOTE)
    .replace(/"|“|”|„|‟/g, DOUBLE_QUOTE);
};

exports.compress = function (sentence) {
  return sentence.replace(/[.]{2,3}/g, '…');
};

// TODO: Improve this to know about acronyms
exports.stripTrailingPeriod = function (sentence) {
  return sentence.replace(/\.$/, '');
};

exports.capitalize = function (sentence) {
  return sentence.charAt(0).toUpperCase() + sentence.substring(1);
};

exports.tokenize = require('./lib/tokenize.js');
