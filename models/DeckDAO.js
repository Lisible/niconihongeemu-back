const db = require('../models/Database');
const DBUtils = require('../utils/DBUtils');
const Deck = require('../models/Deck');
const Exception = require('../models/Exception');

class DeckDAO {
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

	async fetchUserDecks(login) {
		return await db.findDocumentsByValue('deck', 'login', login);
	}

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