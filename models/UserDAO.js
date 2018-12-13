const db = require('../models/Database');
const PasswordUtils = require('../utils/PasswordUtils');
const Exception = require('../models/Exception');

class UserDAO {
	async createUser(user) {
		user.passwordHash = await PasswordUtils.hash(user.password); 
		delete user.password;

		if((await db.findDocumentsByValue('user', 'login', user.login)).length != 0)
			throw 'User already exists !!'

		await db.insertDocument('user', user);
	}

	async getUser(login) {
		return (await db.findDocumentsByValue('user', 'login', login))[0];
	}

	async verifyPasswordHash(login, password) {
		const user = await this.getUser(login);
		if(user === undefined) 
			throw new Exception(404, "User doesn't exists");

		if(!await PasswordUtils.verify(user.passwordHash, password))
			throw new Exception(401, "Authentication failed");
	}
}

module.exports = UserDAO;