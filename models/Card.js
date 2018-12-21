/**
 * Represents a Card
 */
class Card {
    /**
     * Creates a card
     * @param id The identifier of the deck to use when storing the deck in 
                 database
     * @param front The front of the deck
     * @param back The back of the deck
     */
    constructor(id, front, back) {
        this.id = id;
        this.front = front;
        this.back = back;
    }

    /**
     * @return The identifier of the card
     */
    getId() {
        return this.id;
    }

    /**
     * @return The front of the card
     */
    getFront() {
        return this.front;
    }

    /**
     * @return The back of the card
     */
    getBack() {
        return this.back;
    }
}

module.exports = Card;