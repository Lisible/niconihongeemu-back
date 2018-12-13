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
	},

	/**
	 * Verifies the equality between the hash and the given password's hash
	 * @param hash The hash
	 * @param password The password to verify
	 */
	verify: function(hash, password) {
		return argon2.verify(hash, password);
	},

	/**
	 * Generates a random token
	 * @return The generated token
	 */
	generateToken: function() {
		return Math.random().toString(36).substr(2);
	}
}