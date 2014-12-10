'use strict';

var SINGLE_QUOTE = exports.SINGLE_QUOTE = "'";
var DOUBLE_QUOTE = exports.DOUBLE_QUOTE = '"';
var tokenize = require('./lib/tokenize.js');
var nlcstToString = require('nlcst-to-string');

exports.normalizeWhitespace = function (value) {
  return value.replace(/\s+/g, ' ');
};

exports.trim = function (value) {
  return value.trim();
};

exports.normalizeQuotes = function (value) {
  return value
    .replace(/''|``|’’|‛‛/g, DOUBLE_QUOTE)
    .replace(/'|‘|’|‚|‛|‹|›/g, SINGLE_QUOTE)
    .replace(/"|“|”|„|‟|«|»/g, DOUBLE_QUOTE);
};

exports.compress = function (value) {
  return value.replace(/[.]{2,3}/g, '…');
};

exports.stripTrailingPeriod = function (value) {
  var nodes = tokenize(value);

  var index = -1;
  var length = nodes.length;
  var sentence;

  while (++index < length) {
    if (nodes[index].type === 'SentenceNode') {
      sentence = nodes[index].children;

      // Iterate over every `sentence`s children. Every full-stop NOT part of a
      // word is such a direct child. If we find one, ``hide'' its value.
      while (sentence[++index]) {
        if (nlcstToString(sentence[index]) === '.') {
          sentence[index].value = '';
        }
      }
    }
  }

  return nlcstToString({children: nodes});
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

exports.capitalize = function (value) {
  var nodes = tokenize(value);
  var node;

  if ((node = findFirst(nodes, 'SentenceNode')) &&
      (node = findFirst(node.children, 'WordNode')) &&
      (node = findFirst(node.children, 'TextNode'))) {
    node.value = node.value.charAt(0).toUpperCase() + node.value.substring(1);
  }

  return nlcstToString({children: nodes});
};

exports.tokenize = function (value) {
  var nodes = tokenize(value);

  var index = -1;
  var length = nodes.length;

  while (++index < length) {
    nodes[index] = nlcstToString(nodes[index]);
  }

  return nodes;
};
