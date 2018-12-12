const argon2 = require('argon2');

module.exports = {
	/**
	 * Hashes a string
	 * @param str The string to hash
	 * @return The hash
	 */
	hash: function(str) {
		// Note: argon2 generates a random salt itself
		return argon2.hash(str);
	}
}