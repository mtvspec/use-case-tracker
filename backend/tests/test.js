'use strict';

var assert = require('chai').assert;
describe('IIN', function() {
  describe('#indexOf()', function() {
    it('should return true when the value is valid IIN', function() {
      let iin = '871215301400'
      assert.ok(iin);
      assert.typeOf(iin, 'string');
      assert.lengthOf(iin, 12);
    });
  });
});
