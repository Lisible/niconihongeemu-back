const db = require('../models/Database');
const DBUtils = require('../utils/DBUtils');
const Deck = require('../models/Deck');

class DeckDAO {
	async insertDeck(deck) {
		await db.insertDocument('deck', deck);
	}

	async fetchUserDecks(login) {
		return await db.findDocumentsByValue('deck', 'login', login);
	}

	async fetchDeck(id) {
		return await db.findDocumentByValue('deck', 'id', id);
	}

	async deleteDeck(id) {
		await db.deleteDocumentWithId('deck', id);
	}

	async modifyDeckName(id, name) {
		await db.updateDocumentName('deck', id, name);
	}

	async getCardListFromDeck(idDeck) {
		const deck = this.parseDeckJSON(await db.findDocumentByValue('deck', 'id', idDeck));
		return await deck.getCardList();
	}

	parseDeckJSON(deckJSON){
		return new Deck(deckJSON.id, deckJSON.name, deckJSON.cardList, deckJSON.login);
	}

	async insertCardInDeck(id, card){
		card.id = DBUtils.generateId();
		const deck = this.parseDeckJSON(await db.findDocumentByValue('deck', 'id', id));
		let cardList = deck.getCardList();
		cardList.push(card);
		await db.updateDocumentCardList('deck', id, cardList);
	}
}

module.exports = DeckDAO;