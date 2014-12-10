'use strict';

require('chai').should();

var fs = require('fs');
var path = require('path');
var sentenceTools = require('..');
var util = require('util');

describe('sentence-tools', function () {
  describe('normalizeWhitespace', function () {
    it('should normalize whitespace', function () {
      var result = sentenceTools.normalizeWhitespace(
        'I   \nam a \t\t  sentence with  weird   spaces');

      result.should.equal('I am a sentence with weird spaces');
    });
  });

  describe('normalizeQuotes', function () {
    it('should normalize quotes', function () {
      var result = sentenceTools.normalizeQuotes('‘’‛ \'\' `` ’’ “ ” „ ‟');

      result.should.equal('\'\'\' " " " " " " "');
    });
  });

  describe('stripTrailingPeriod', function () {
    it('should stripl trailing periods', function () {
      var result = sentenceTools.stripTrailingPeriod('U.S.A., and such.');

      result.should.equal('U.S.A., and such');
    });

    it('should stripl trailing periods preceding parenthesis', function () {
      var result = sentenceTools.stripTrailingPeriod('N.A.S.A. (and such.)');

      result.should.equal('N.A.S.A. (and such)');
    });
  });

  describe('compress', function () {
    it('should compress a sentence', function () {
      var result = sentenceTools.compress("I don't know... Sounds scary..");

      result.should.equal("I don't know… Sounds scary…");
    });
  });

  describe('capitalize', function () {
    it('should capitalize the first letter of a sentence', function () {
      var result = sentenceTools.capitalize('lower case, huh?');

      result.should.equal('Lower case, huh?');
    });

    it('should capitalize the first letter of a sentence when preceded ' +
      'by an apostrophe',
      function () {
        var result = sentenceTools.capitalize("'twas the night.");

        result.should.equal("'Twas the night.");
      }
    );

    it('should capitalize the first letter of a sentence when preceded ' +
      'by a quote',
      function () {
        var result = sentenceTools.capitalize('"is it the night?"');

        result.should.equal('"Is it the night?"');
      }
    );
  });

  describe('trim', function () {
    it('should trim whitespace from a sentence', function () {
      var result = sentenceTools.trim('  \t  testing  \t  ');

      result.should.equal('testing');
    });
  });

  describe('countWords', function () {
    var sentences = [
      ['Sally sold sea shells, swimmingly .  right?', 6],
      ['meow--meow "meow--(meow, meow)", meow meow!', 7]
    ];

    sentences.forEach(function (sentence) {
      var title = util.format('should find %d words in "%s"', sentence[1],
        sentence[0]);

      it(title, function () {
        var result = sentenceTools.countWords(sentence[0]);

        result.should.equal(sentence[1]);
      });
    });
  });

  describe('tokenize', function () {
    var sentencesFixture = require('./sentences.json');
    var article = fs.readFileSync(path.resolve(__dirname, 'article.txt'));

    it('should tokenize a buffer into sentences', function () {
      var sentences = sentenceTools.tokenize(article);

      sentences.should.deep.equal(sentencesFixture);
    });

    it('should tokenize a string into sentences', function () {
      var sentences = sentenceTools.tokenize(article.toString());

      sentences.should.deep.equal(sentencesFixture);
    });
  });
});
