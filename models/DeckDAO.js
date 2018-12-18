const db = require('../models/Database');
const DBUtils = require('../utils/DBUtils');

class DeckDAO {
	async insertDeck(deck) {
		await db.insertDocument('deck', deck);
	}

	async fetchUserDecks(login) {
		return await db.findDocumentsByValue('deck', 'login', login);
	}
}

module.exports = DeckDAO;