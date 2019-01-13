const TIMEOUT_DELAY = 3000000;

class TokenStore {
	constructor() {
		this.tokens = {};
	}

	/**
	 * Stores a token for a user
	 * @param login The user login
	 * @param token The token to store
	 */
	store(login, token) {
		const timeout = setTimeout(() => {
			delete this.tokens[token];
		}, TIMEOUT_DELAY);

		this.tokens[token] = {login: login, timeout: timeout};
	}

	/**
	 * Resets a token timeout
	 * @param token The token to reset the timeout to
	 */
	resetTimeout(token) {
		clearTimeout(this.tokens[token].timeout);
		this.tokens[token].timeout = setTimeout(() => {
			delete this.tokens[token];
		}, TIMEOUT_DELAY);
	}


	/**
	 * Checks if a token is valid
	 * @param token The token to check
	 * @return true if the token is valid
	 */
	checkToken(token) {
		return this.tokens[token] !== undefined;
	}

	getLoginFromToken(token) {
		return this.tokens[token].login;
	}
}

module.exports = new TokenStore();