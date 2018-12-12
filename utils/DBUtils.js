const shortid = require('shortid');

/**
 * Helper functions for the database
 */
module.exports = {
	/**
	 * Generates a database identifier
	 * @return The generated identifier
	 */
	generateId: function(){
		return shortid.generate();
	}
}