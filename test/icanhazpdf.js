describe('PDF finder', function() {

  describe('publisher identifier', function() {

    it('should recognize plos', function() {
      chai.assert.equal(shelf.pdf.match('10.1371/journal.pcbi.1004725'), 'plos');
    });

    it('should recognize pnas', function() {
      chai.assert.equal(shelf.pdf.match('10.1073/pnas.1523317113'), 'pnas');
    });

    it('should recognize wiley', function() {
      chai.assert.equal(shelf.pdf.match('10.1111/j.1461-0248.2010.01572.x'), 'wiley');
    });

  });

});
