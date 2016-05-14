var chai = require('chai');
chai.use(require('chai-fs'));
var path = require('path');
var fs = require('fs');

var shelf = require('../shelf.js');

// TODO DOI test
// var dna = "10.1038/171737a0";
// var dna_ref = get_json_from_doi(dna);


describe('Library', function() {

  describe('loading', function() {

    it('should create a default path if none is given', function() {
      var lib = new shelf.Library();
      chai.assert.include(lib.path, ".pandoc");
    });

    it('should use the given path if a path is given', function() {
      var library = path.resolve("./test/data");
      var lib = new shelf.Library(library);
      chai.assert.equal(library, lib.path);
    });
  });

  describe('writing', function() {

    it('should write a default.json file in the path', function() {
      var library = path.resolve("./test/data");
      var lib = new shelf.Library(library);
      lib.write();
      chai.assert.isFile(library + "/default.json");
      fs.unlinkSync(library + "/default.json"); // NOTE remove the test file
    });

  });

  describe('getting entries', function() {

    it('should return something when a valid key is accessed', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      // NOTE This will pick the first key by default
      chai.assert.isDefined(Object.keys(lib.entries)[0]);
    });
    it('should return undefined when an invalid key is accessed', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.isUndefined(lib.entry("ThisIsNotAnEntry"));
    });
  });

});

describe('Unique ID', function() {

  describe('names', function() {

    it('should return anonymous if there are no authors');

    it('should return the last name if the first author is a person');

    it('should return the institution name if the first author is an institution', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.Author(lib.entry("rcoreteam_lef")), "RCoreTeam")
    });

    it('should remove diacritics', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.Author(lib.entry("laliberte_dht")), "Laliberte")
    });

    it('also works with lowercase authors', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.author(lib.entry("laliberte_dht")), "laliberte")
    });

    it('should return the editor name if there are no authors');
  });

  describe('unicity', function() {
    it('should return a unique number at the end if there is a duplicate');
  });

});
