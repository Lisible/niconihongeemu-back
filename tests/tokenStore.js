const assert = require('assert');
const TokenStore = require('../models/TokenStore');

describe('TokenStore', function() {
  describe('#store()', function() {
    it('should store an access_token', function() {
    	TokenStore.store("test", "THISISATOKEN");
    	assert.equal(TokenStore.checkToken("THISISATOKEN"), true);
    });
  });
  describe('#resetTimeout()', function() {
  	TokenStore.store("test", "THISISATOKEN");
  	const previousTimeout = TokenStore.tokens["THISISATOKEN"].timeout;
  	TokenStore.resetTimeout("THISISATOKEN");

    it('should have a new timeout', function() {
    	const timeout = TokenStore.tokens["THISISATOKEN"].timeout;
    	assert.notEqual(previousTimeout, timeout);
    });
  });
  describe('#getLoginFromToken()', function() {
  	TokenStore.store("test", "THISISATOKEN");
  	const login = TokenStore.getLoginFromToken("THISISATOKEN");

    it('should be the correct login', function() {
    	assert.equal(login, "test");
  	});
  });
});
