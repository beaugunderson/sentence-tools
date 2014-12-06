'use strict';

var SINGLE_QUOTE = exports.SINGLE_QUOTE = "'";
var DOUBLE_QUOTE = exports.DOUBLE_QUOTE = '"';

exports.normalizeWhitespace = function (value, cb) {
  cb(null, value.replace(/\s+/g, ' '));
};

exports.trim = function (value, cb) {
  cb(null, value.trim());
};

exports.normalizeQuotes = function (value, cb) {
  cb(null, value
    .replace(/''|``|’’|‛‛/g, DOUBLE_QUOTE)
    .replace(/'|‘|’|‚|‛|‹|›/g, SINGLE_QUOTE)
    .replace(/"|“|”|„|‟|«|»/g, DOUBLE_QUOTE));
};

exports.compress = function (value, cb) {
  cb(null, value.replace(/[.]{2,3}/g, '…'));
};

// TODO: Improve this to know about acronyms
exports.stripTrailingPeriod = function (value, cb) {
  cb(null, value.replace(/\.$/, ''));
};

exports.capitalize = function (value, cb) {
  cb(null, value.charAt(0).toUpperCase() + value.substring(1));
};

exports.tokenize = require('./lib/tokenize.js');
