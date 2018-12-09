class Word {
    constructor(kanjiWritings, kanaWritings, romajiWritings, definitions) {
        this.kanjiWritings = kanjiWritings;
        this.kanaWritings = kanaWritings;
        this.romajiWritings = romajiWritings; 
        this.definitions = definitions;
    }
}

module.exports = Word;