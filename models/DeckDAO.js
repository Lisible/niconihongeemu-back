const db = require('../models/Database');
const DBUtils = require('../utils/DBUtils');
const Deck = require('../models/Deck');
const Exception = require('../models/Exception');

class DeckDAO {
	/**
	 * Inserts a deck into the database
	 * @param deck The deck to insert
	 */
	async insertDeck(deck) {
		if(!deck.name.match(/^([a-z0-9]|\s)+$/i)) {
			throw new Exception(400, "Deck name must be alphanumeric");
		}

		const d = await db.findDocumentByValue('deck', 'name', deck.name);
		
		if(d != undefined) {
			throw new Exception(409, "Deck name already used");
		}

		return await db.insertDocument('deck', deck);
	}
	
	/**
	 * Returns the decks of a user
	 * @param login The login of the user
	 */
	async fetchUserDecks(login) {
		return await db.findDocumentsByValue('deck', 'login', login);
	}

	/**
	 * Returns a deck of a user
	 * @param id The id of the deck
	 * @param login The login of the user
	 */
	async fetchDeck(id, login) {
		const deck = await db.findDocumentByValue('deck', 'id', id);
		if(deck == undefined) {
			throw new Exception(404, "Deck not found");
		}
		if(deck.login != login) {
			throw new Exception(403, "Deck access not allowed");
		}

		return deck;
	}

	/**
	 * Deletes the deck of a user
	 * @param id The id of the deck
	 * @param login The login of the user
	 */
	async deleteDeck(id, login) {
		const deck = await db.findDocumentByValue('deck', 'id', id);
		if(deck == undefined) {
			throw new Exception(404, "Deck not found");
		}
		if(deck.login != login) {
			throw new Exception(403, "Deck access not allowed");
		}
		await db.deleteDocumentWithId('deck', id);
	}

	/**
	 * Renames the  deck of a user
	 * @param id The id of the deck
	 * @param login The login of the user
	 */
	async modifyDeckName(id, name, login) {
		const deck = await db.findDocumentByValue('deck', 'id', id);
		if(deck == undefined) {
			throw new Exception(404, "Deck not found");
		}
		if(deck.login != login) {
			throw new Exception(403, "Deck access not allowed");
		}
		await db.updateDocumentName('deck', id, name);
	}

	/**
	 * Returns the cards of a deck of a user
	 * @param idDeck The deck id
	 * @param login The login of the user
	 */
	async getCardListFromDeck(idDeck, login) {
		const d = await db.findDocumentByValue('deck', 'id', idDeck);
		if(d == undefined) {
			throw new Exception(404, "Deck not found");
		}
		const deck = this.parseDeckJSON(d);
		if(deck.login != login) {
			throw new Exception(403, "Deck access not allowed");
		}
		return await deck.getCardList();
	}


	/**
	 * Return a card of a deck of a user
	 * @param idDeck The deck id
	 * @param idCard The card id
	 * @param login The login of the user
	 */
	async getCardFromDeck(idDeck, idCard, login) {
		const d = await db.findDocumentByValue('deck', 'id', idDeck);
		if(d == undefined) {
			throw new Exception(404, "Deck not found");
		}
		const deck = this.parseDeckJSON(d);
		if(deck.login != login) {
			throw new Exception(403, "Deck access not allowed");
		}
		const list = deck.getCardList();
		const card = list.filter(c => {
			return c.id == idCard;
		})[0];
		if(card == undefined){
			throw new Exception(404, "Card not found");
		}
		return card;
	}

	parseDeckJSON(deckJSON){
		return new Deck(deckJSON.id, deckJSON.name, deckJSON.cardList, deckJSON.login);
	}

	/**
	 * Inserts a card in a deck
	 * @param id The id of the deck
	 * @param card The card to add 
	 * @param login The login of the user
	 */
	async insertCardInDeck(id, card, login){
		const d = await db.findDocumentByValue('deck', 'id', id);
		if(d == undefined) {
			throw new Exception(404, "Deck not found");
		}
		const deck = this.parseDeckJSON(d);
		if(deck.login != login) {
			throw new Exception(403, "Deck access not allowed");
		}
		card.id = DBUtils.generateId();
		let cardList = deck.getCardList();
		cardList.push(card);
		await db.updateDocumentCardList('deck', id, cardList);
		return card;
	}

	/**
	 * Deletes a card from a deck
	 * @param idDeck The id of the deck
	 * @param idCard The id of the card 
	 * @param login The login of the user
	 */
	async deleteCardFromDeck(idDeck, idCard, login){
		const d = await db.findDocumentByValue('deck', 'id', idDeck);
		if(d == undefined) {
			throw new Exception(404, "Deck not found");
		}
		const deck = this.parseDeckJSON(d);
		if(deck.login != login) {
			throw new Exception(403, "Deck access not allowed");
		}
		let cardList = deck.getCardList();
		const card = cardList.filter(c => {
			return c.id == idCard;
		})[0];
		if(card == undefined){
			throw new Exception(404, "Card not found");
		}
		cardList = cardList.filter(c => {
			return c.id !== idCard;
		});
		await db.updateDocumentCardList('deck', idDeck, cardList);
	}

	/**
	 * Updates a card 
	 * @param idDeck The id of the deck
	 * @param idCard The id of the card
	 * @param front The front of the card
	 * @param back The back of the card
	 * @param nextRevisionDate The next revision date
	 * @param streak The streak
	 */
	async updateCard(idDeck, idCard, front, back, nextRevisionDate, streak, login){
		const d = await db.findDocumentByValue('deck', 'id', idDeck);
		if(d == undefined) {
			throw new Exception(404, "Deck not found");
		}
		const deck = this.parseDeckJSON(d);
		if(deck.login != login) {
			throw new Exception(403, "Deck access not allowed");
		}
		let cardList = deck.getCardList();
		const card = cardList.filter(c => {
			return c.id == idCard;
		})[0];
		if(card == undefined){
			throw new Exception(404, "Card not found");
		}
		cardList.forEach(c => {
			if(c.id == idCard){
				c.front = front;
				c.back = back;
				c.nextRevisionDate = nextRevisionDate;
				c.streak = streak;
			}
		});
		await db.updateDocumentCardList('deck', idDeck, cardList);
	}
}

module.exports = DeckDAO;