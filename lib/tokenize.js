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

    var paragraph = parseEnglish.tokenizeParagraph(text).children;

    var index = -1;
    var length = paragraph.length;

    var results = [];

    while (++index < length) {
      if (paragraph[index].type === 'SentenceNode') {
        results.push(nlcstToString(paragraph[index]));
      }
    }

    cb(null, results);
  } catch (err) {
    cb(err);
  }
};
