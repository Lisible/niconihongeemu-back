const TokenStore = require('../models/TokenStore');

module.exports = {
	/**
	 * Refreshes the session
	 */
	refresh: function(req, res, next) {
	    if(TokenStore.checkToken(req.query.access_token))
	    	TokenStore.resetTimeout(req.query.access_token);
	
	    next();
	}
}