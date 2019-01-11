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
     * @param nextRevisionDate The date of the next revision
     */
    constructor(id, front, back, nextRevisionDate, streak) {
        this.id = id;
        this.front = front;
        this.back = back;
        this.nextRevisionDate = nextRevisionDate !== undefined ? nextRevisionDate : 0;
        this.streak = streak !== undefined ? streak : 0;
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

    /**
     * @return The date of the next revision
     */
    getNextRevisionDate() {
        return this.nextRevisionDate;
    }

    /**
     * @return The current streak
     */
    getStreak() {
        return this.streak;
    }
}

module.exports = Card;