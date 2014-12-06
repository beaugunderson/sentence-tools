'use strict';

require('chai').should();

var fs = require('fs');
var path = require('path');
var sentenceTools = require('..');

describe('sentence-tools', function () {
  describe('normalizeWhitespace', function () {
    it('should normalize whitespace', function (done) {
      sentenceTools.normalizeWhitespace('I   \nam a \t\t  sentence with  weird   spaces', function (err, result) {
        result.should.equal('I am a sentence with weird spaces');

        done(err);
      });
    });
  });

  describe('normalizeQuotes', function () {
    it('should normalize quotes', function (done) {
      sentenceTools.normalizeQuotes('‘’‛ \'\' `` ’’ “ ” „ ‟', function (err, result) {
        result.should.equal('\'\'\' " " " " " " "');

        done(err);
      });
    });
  });

  describe('compress', function () {
    it('should compress a sentence', function (done) {
      sentenceTools.compress("I don't know... Sounds scary..", function (err, result) {
        result.should.equal("I don't know… Sounds scary…");

        done(err);
      });
    });
  });

  describe('capitalize', function () {
    it('should capitalize the first letter of a sentence', function (done) {
      sentenceTools.capitalize('lower case, huh?', function (err, result) {
        result.should.equal('Lower case, huh?');

        done(err);
      });
    });
  });

  describe('trim', function () {
    it('should trim whitespace from a sentence', function (done) {
      sentenceTools.trim('  \t  testing  \t  ', function (err, result) {
        result.should.equal('testing');

        done(err);
      });
    });
  });

  describe('tokenize', function () {
    var sentencesFixture = require('./sentences.json');
    var article = fs.readFileSync(path.resolve(__dirname, 'article.txt'));

    it('should tokenize a buffer into sentences', function (done) {
      sentenceTools.tokenize(article, function (err, sentences) {
        if (err) {
          return cb(err);
        }

        sentences.should.deep.equal(sentencesFixture);

        done();
      });
    });

    it('should tokenize a string into sentences', function (done) {
      sentenceTools.tokenize(article.toString(), function (err, sentences) {
        if (err) {
          return cb(err);
        }

        sentences.should.deep.equal(sentencesFixture);

        done();
      });
    });
  });
});
