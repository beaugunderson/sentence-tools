'use strict';

var SINGLE_QUOTE = exports.SINGLE_QUOTE = "'";
var DOUBLE_QUOTE = exports.DOUBLE_QUOTE = '"';
var tokenize = require('./lib/tokenize.js');
var nlcstToString = require('nlcst-to-string');
var _ = require('lodash');

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

function hideFullStop(node) {
  if (nlcstToString(node) === '.') {
    node.value = '';
  }
}

exports.stripTrailingPeriod = function (value) {
  var nodes = tokenize(value);

  nodes.forEach(function (node) {
    if (node.type === 'SentenceNode') {
      node.children.forEach(hideFullStop);
    }
  });

  return nlcstToString({children: nodes});
};

exports.countWords = function (value) {
  return tokenize(value).reduce(function (sum, node) {
    return sum + _.filter(node.children, {type: 'WordNode'}).length;
  }, 0);
};

exports.lastWord = function (value) {
  var wordNodes = tokenize(value).reduce(function (wordNodes, node) {
    return wordNodes.concat(_.filter(node.children, {type: 'WordNode'}));
  }, []);

  return nlcstToString(_.last(wordNodes));
};

exports.capitalize = function (value) {
  var nodes = tokenize(value);
  var node;

  if ((node = _.find(nodes, {type: 'SentenceNode'})) &&
      (node = _.find(node.children, {type: 'WordNode'})) &&
      (node = _.find(node.children, {type: 'TextNode'}))) {
    node.value = node.value.charAt(0).toUpperCase() + node.value.substring(1);
  }

  return nlcstToString({children: nodes});
};

exports.tokenize = function (value) {
  return tokenize(value).map(nlcstToString);
};
