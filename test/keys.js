// TODO DOI test
// var dna = "10.1038/171737a0";
// var dna_ref = get_json_from_doi(dna);

describe('Keys', function() {

  describe('names', function() {

    it('should return anonymous if there are no authors');

    it('should return the last name if the first author is a person');

    it('should return the institution name if the first author is an institution', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.Author(lib.entry("rcoreteam_lef")), "RCoreTeam");
    });

    it('should remove diacritics', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.Author(lib.entry("laliberte_dht")), "Laliberte");
    });

    it('should also works with lowercase authors', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.author(lib.entry("laliberte_dht")), "laliberte");
    });

    it('should also works with uppercase authors', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.AUTHOR(lib.entry("laliberte_dht")), "LALIBERTE");
    });

    it('should also works with shortened author names', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.AUT(lib.entry("laliberte_dht")), "LAL");
      chai.assert.equal(shelf.keys.Aut(lib.entry("laliberte_dht")), "Lal");
      chai.assert.equal(shelf.keys.aut(lib.entry("laliberte_dht")), "lal");
    });

    it('should return the editor name if there are no authors');
    it('should work with short author names (less than 2 valid chars)');
  });

  describe('date', function() {
    it('should return the issued year if present', function () {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.Year(lib.entry("laliberte_dht")), "2010");
    });
    it('should work with the shortened year too', function () {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.Yr(lib.entry("laliberte_dht")), "10");
    });
    it('should return the accessed year if there is no issued date present');
    it('should return ???? if there are no dates');
  });

  describe('title', function() {
    it('should return the title first word', function () {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.title_first_word(lib.entry("laliberte_dht")), "deforestation");
    });
    it('should return the title first letters', function () {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.title_first_letters(lib.entry("laliberte_dht")), "dht");
    });
    it('should return the title first letters even if there are less than three words');
    it('should remove diacritics from the title');
    it('should return something even when there is no title');
  });

  describe('keymakers', function() {
    it('should work with author_Year', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.author_Year(lib.entry("laliberte_dht")), "laliberte_2010");
    });
    it('should work with author_Yr', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.author_Yr(lib.entry("laliberte_dht")), "laliberte_10");
    });
    it('should work with authorYear', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.authorYear(lib.entry("laliberte_dht")), "laliberte2010");
    });
    it('should work with authorYr', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      chai.assert.equal(shelf.keys.authorYr(lib.entry("laliberte_dht")), "laliberte10");
    });
    it('should work with author_word');
    it('should work with Author_word');
    it('should work with author_letters');
    it('should work with Author_letters');
  });

  describe('unicity', function() {
    it('should return a unique number at the end if there is a duplicate');
  });

});
