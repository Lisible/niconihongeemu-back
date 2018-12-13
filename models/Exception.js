/**
 * Represents an error that is sent on request failure
 */
class Exception {
	/**
	 * Creates an error
	 * @param code The HTTP error code
	 * @param message A human-readable error message
	 */
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}
}

module.exports = Exception;