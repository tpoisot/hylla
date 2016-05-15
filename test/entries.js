describe('Entries', function() {

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

  describe('adding references', function() {      
    it('should create a new key', function() {
      var doi = "10.1111/ecog.01748";
      var ref = shelf.doi.from_doi(doi);
      shelf.keys.Year(ref); // TODO remove
      var lib = new shelf.Library(path.resolve("./test/data"));
      var newref = lib.new(ref);
      // First we check the key
      chai.assert.equal(newref, 'gra_15_tat');
      // Then we remove the file
      fs.unlinkSync(lib.records + "/" + newref + ".json");


    });
    it('should create a new key with a unique identifier');
    it('should create a new file when a key is created');
    it('should load the updated library');
  });

});
