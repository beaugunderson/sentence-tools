'use strict';

var ParseEnglish = require('parse-english');
var parseEnglish = new ParseEnglish();
var nlcstToString = require('nlcst-to-string');

module.exports = function (text, cb) {
  if (Buffer.isBuffer(text)) {
    text = text.toString();
  }

  try {
    /**
     * Use `tokenizeParagraph` because we only care about
     * different sentences.
     */

    var paragraphs = parseEnglish.tokenizeParagraph(text).children;

    var index = -1;
    var length = paragraphs.length;

    var results = [];

    while (++index < length) {
      if (paragraphs[index].type === 'SentenceNode') {
        results.push(nlcstToString(paragraphs[index]));
      }
    }

    cb(null, results);
  } catch (err) {
    cb(err);
  }
};
