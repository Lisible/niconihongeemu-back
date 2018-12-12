const db = require('../models/Database');
const DBUtils = require('../utils/DBUtils');

class DeckDAO {
	async insertDeck(deck) {
		await db.insertDocument('deck', deck);
	}
}

module.exports = DeckDAO;