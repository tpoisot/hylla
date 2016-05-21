describe('PDF finder', function() {
  describe('publisher identifier', function() {
    it('should recognize plos', function() {
      chai.assert.equal(shelf.pdf.match(
        '10.1371/journal.pcbi.1004725'), 'plos');
    });
    it('should recognize pnas', function() {
      chai.assert.equal(shelf.pdf.match('10.1073/pnas.1523317113'),
        'pnas');
    });
    it('should recognize wiley', function() {
      chai.assert.equal(shelf.pdf.match(
        '10.1111/j.1461-0248.2010.01572.x'), 'wiley');
    });
  });

  describe('download module', function() {
    it('should work with plos journals', function() {
      shelf.pdf.get("10.1371/journal.pcbi.0030102");
      assert_file("10fizz1371buzzjournalfizzpcbifizz0030102.pdf");
      fs.unlinkSync("10fizz1371buzzjournalfizzpcbifizz0030102.pdf");
    });
    it('should work from the library', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      var doi = "10.1371/journal.pcbi.0030102";
      var ref = shelf.doi.refFromDoi(doi);
      var newref = lib.new(ref);
      lib.icanhazpdf(newref);
    });
  });
});
