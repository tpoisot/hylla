var assert = require('chai').assert;
var shelf = require('../shelf.js');
var path = require('path');

// TODO add test data

describe('Library', function() {

  describe('loading', function() {

    it('should create a default path if none is given', function () {
      var lib = new shelf.Library();
      assert.include(lib.path, ".pandoc");
    });

    it('should use the given path if a path is given', function () {
      var library = path.resolve("./test/data");
      var lib = new shelf.Library(library);
      assert.equal(library, lib.path);
    });
  });

  describe('getting entries', function() {
    it('should return something when a valid key is accessed', function () {
      assert.equal(0, 1);
    });
    it('should return undefined when an invalid key is accessed', function () {
      assert.equal(0, 1);
    });
  });

});

describe('Unique ID', function() {

  describe('names', function () {
    it('should return anonymous if there are no authors', function () {
      assert.equal(0, 1);
    });
    it('should return the last name if the first author is a person', function () {
      assert.equal(0, 1);
    });
    it('should return the first n characters if the first author is an institution', function () {
      assert.equal(0, 1);
    });
    it('should return the first characters if the name has less than three characters', function () {
      assert.equal(0, 1);
    });
  });

  describe('unicity', function () {
    it('should return a unique number at the end if there is a duplicate', function () {
      assert.equal(0, 1);
    });
  });

});
