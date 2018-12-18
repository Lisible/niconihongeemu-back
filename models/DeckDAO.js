const db = require('../models/Database');
const DBUtils = require('../utils/DBUtils');

class DeckDAO {
	async insertDeck(deck) {
		await db.insertDocument('deck', deck);
	}

	async fetchUserDecks(login) {
		return await db.findDocumentsByValue('deck', 'login', login);
	}

	async fetchDeck(id) {
		return await db.findDocumentsByValue('deck', 'id', id);
	}

	async deleteDeck(id) {
		await db.deleteDocumentWithId('deck', id);
	}

	async modifyDeckName(id, name) {
		await db.updateDocumentName('deck', id, name);
	}
}

module.exports = DeckDAO;