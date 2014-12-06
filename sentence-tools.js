'use strict';

var SINGLE_QUOTE = exports.SINGLE_QUOTE = "'";
var DOUBLE_QUOTE = exports.DOUBLE_QUOTE = '"';
var tokenize = require('./lib/tokenize.js');
var nlcstToString = require('nlcst-to-string');

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

exports.tokenize = function (value, cb) {
  tokenize(value, function (err, results) {
    if (err) {
      cb(err)
    } else {
      var index = -1;
      var length = results.length;

      while (++index < length) {
        results[index] = nlcstToString(results[index]);
      }

      cb(null, results)
    }
  });
}
