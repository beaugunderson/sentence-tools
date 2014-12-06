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

function findFirst(nodes, type) {
  var index = -1;
  var length = nodes.length;

  while (++index < length) {
    if (nodes[index].type === type) {
      return nodes[index];
    }
  }

  return null;
}

exports.capitalize = function (value, cb) {
  tokenize(value, function (err, nodes) {
    if (err) {
      cb(err);
    } else {
      var node = findFirst(nodes, 'SentenceNode');

      if (node) {
        node = findFirst(node.children, 'WordNode');

        if (node) {
          node = findFirst(node.children, 'TextNode');

          if (node) {
            node.value = node.value.charAt(0).toUpperCase() +
              node.value.substring(1);
          }
        }
      }

      cb(null, nlcstToString({
        'children': nodes
      }));
    }
  });
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
