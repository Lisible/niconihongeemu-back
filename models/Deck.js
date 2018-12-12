/**
 * Represents a Deck
 */
class Deck {
    /**
     * Creates a deck
     * @param id The identifier of the deck to use when storing the deck in 
                 database
     * @param name The name of the deck
     * @param cardList The list of cards of the deck
     *                 If not specified: the card list of the deck will be empty
     */
    constructor(id, name, cardList) {
        this.id = id;
        this.name = name;

        if(cardList !== undefined)
            this.cardList = cardList;
        else
            this.cardList = [];
    }

    /**
     * @return The identifier of the deck
     */
    getId() {
        return this.id;
    }

    /**
     * @return The name of the deck
     */
    getName() {
        return this.name;
    }


    /**
     * @return The list of the cards of the deck
     */
    getCardList() {
        return this.cardList;
    }
}

module.exports = Deck;