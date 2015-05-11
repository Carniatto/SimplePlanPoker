'use strict';

describe('ppo.version module', function() {
  beforeEach(module('ppo.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
