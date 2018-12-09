class Deck {
	constructor(id, name, cardList) {
		this.id = id;
		this.name = name;

		if(cardList !== undefined)
			this.cardList = cardList;
		else
			this.cardList = [];
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
	}

	getCardList() {
		return this.cardList;
	}
}

module.exports = Deck;