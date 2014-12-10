'use strict';

var ParseEnglish = require('parse-english');
var parseEnglish = new ParseEnglish();

module.exports = function (text) {
  if (Buffer.isBuffer(text)) {
    text = text.toString();
  }

  // Use `tokenizeParagraph` because we only care about different sentences.
  var paragraph = parseEnglish.tokenizeParagraph(text).children;

  var index = -1;
  var length = paragraph.length;

  var results = [];

  while (++index < length) {
    if (paragraph[index].type === 'SentenceNode') {
      results.push(paragraph[index]);
    }
  }

  return results;
};
