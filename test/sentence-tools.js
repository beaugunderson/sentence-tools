'use strict';

require('chai').should();

var fs = require('fs');
var path = require('path');
var sentenceTools = require('..');

describe('sentence-tools', function () {
  describe('normalizeWhitespace', function () {
    it('should normalize whitespace', function () {
      sentenceTools.normalizeWhitespace('I   \nam a \t\t  sentence with  weird   spaces')
        .should.equal('I am a sentence with weird spaces');
    });
  });

  describe('normalizeQuotes', function () {
    it('should normalize quotes', function () {
      var quotes = '‘’‛ \'\' `` ’’ “ ” „ ‟';

      sentenceTools.normalizeQuotes(quotes)
        .should.equal('\'\'\' " " " " " " "');
    });
  });

  describe('compress', function () {
    it('should compress a sentence', function () {
      sentenceTools.compress("I don't know... Sounds scary..")
        .should.equal("I don't know… Sounds scary…");
    });
  });

  describe('capitalize', function () {
    it('should capitalize the first letter of a sentence', function () {
      sentenceTools.capitalize('lower case, huh?')
        .should.equal('Lower case, huh?');
    });
  });

  describe('trim', function () {
    it('should trim whitespace from a sentence', function () {
      sentenceTools.trim('  \t  testing  \t  ')
        .should.equal('testing');
    });
  });

  describe('tokenize', function () {
    var sentencesFixture = require('./sentences.json');
    var article = fs.readFileSync(path.resolve(__dirname, 'article.txt'));

    it('should tokenize a buffer into sentences', function (cb) {
      sentenceTools.tokenize(article, function (err, sentences) {
        if (err) {
          return cb(err);
        }

        sentences.should.deep.equal(sentencesFixture);

        cb();
      });
    });

    it('should tokenize a string into sentences', function (cb) {
      sentenceTools.tokenize(article.toString(), function (err, sentences) {
        if (err) {
          return cb(err);
        }

        sentences.should.deep.equal(sentencesFixture);

        cb();
      });
    });
  });
});
