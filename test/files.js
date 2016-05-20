describe('Files', function() {

  describe('database', function() {
    it('should exist');
    it('should be updated when writing the library');
  });

  describe('adding', function() {

    it('should create a PDF file', function() {
      var lib = new shelf.Library(path.resolve("./test/data"));
      var doi = "10.1371/journal.pcbi.0030102";
      var pdf = shelf.pdf.get(doi);
      var ref = shelf.doi.from_doi(doi);
      var newref = lib.new(ref);
      lib.attach(newref, pdf);
    });

  });

});
