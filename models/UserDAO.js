const db = require('../models/Database');
const PasswordUtils = require('../utils/PasswordUtils');
const Exception = require('../models/Exception');

class UserDAO {
	async createUser(user) {
		if(user.password.length < 6)
			throw new Exception(400, "Password must be at least 6 characters long");

		user.passwordHash = await PasswordUtils.hash(user.password); 
		delete user.password;

		if(user.login.length == 0)
			throw new Exception(400, "Login can't be empty");

		if(!user.login.match(/^[a-z0-9]+$/i))
			throw new Exception(400, "Login must be alphanumeric");

		if((await db.findDocumentsByValue('user', 'login', user.login)).length != 0)
			throw new Exception(409, "User already exists");

		await db.insertDocument('user', user);
	}

	async getUser(login) {
		return (await db.findDocumentsByValue('user', 'login', login))[0];
	}

	async verifyPasswordHash(login, password) {
		const user = await this.getUser(login);
		if(user === undefined) 
			throw new Exception(404, "User doesn't exist");

		if(!await PasswordUtils.verify(user.passwordHash, password))
			throw new Exception(401, "Authentication failed");
	}
}

module.exports = UserDAO;