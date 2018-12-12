const db = require('../models/Database');
const PasswordUtils = require('../utils/PasswordUtils');

class UserDAO {
	async createUser(user) {
		user.passwordHash = await PasswordUtils.hash(user.password); 
		delete user.password;

		if((await db.findDocumentsByValue('user', 'login', user.login)).length != 0)
			throw 'User already exists !!'

		await db.insertDocument('user', user);
	}
}

module.exports = UserDAO;