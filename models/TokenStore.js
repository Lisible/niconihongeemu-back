const TIMEOUT_DELAY = 1000;

class TokenStore {
	constructor() {
		this.tokens = {};
	}

	store(login, token) {
		const timeout = setTimeout(() => {
			delete this.tokens[token];
		}, TIMEOUT_DELAY);

		this.tokens[token] = {login: login, timeout: timeout};
	}

	resetTimeout(token) {
		clearTimeout(this.tokens[token].timeout);
		this.tokens[token].timeout = setTimeout(() => {
			delete this.tokens[token];
		}, TIMEOUT_DELAY);
	}

	checkToken(token) {
		return this.tokens[token] !== undefined;
	}

	getLoginFromToken(token) {
		return this.tokens[token].login;
	}
}

module.exports = new TokenStore();