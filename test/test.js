var assert = require('chai').assert;

// TODO add test data

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
