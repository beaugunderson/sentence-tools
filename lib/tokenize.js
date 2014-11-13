'use strict';

var ParseEnglish = require('parse-english');
var Retext = require('retext');
var retextInspect = require('retext-inspect');
var retextVisit = require('retext-visit');

var retext = new Retext(new ParseEnglish())
  .use(retextInspect)
  .use(retextVisit);

module.exports = function (text, cb) {
  if (Buffer.isBuffer(text)) {
    text = text.toString();
  }

  retext.parse(text, function (err, tree) {
    if (err) {
      return cb(err);
    }

    var results = [];

    tree.visit(tree.SENTENCE_NODE, function (sentenceNode) {
      results.push(sentenceNode.toString());
    });

    cb(err, results);
  });
};
