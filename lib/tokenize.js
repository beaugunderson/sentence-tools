'use strict';

var ParseEnglish = require('parse-english');
var parseEnglish = new ParseEnglish();
var _ = require('lodash');

module.exports = function (text) {
  if (Buffer.isBuffer(text)) {
    text = text.toString();
  }

  // Use `tokenizeParagraph` because we only care about different sentences.
  var paragraph = parseEnglish.tokenizeParagraph(text).children;

  return _.filter(paragraph, {type: 'SentenceNode'});
};
