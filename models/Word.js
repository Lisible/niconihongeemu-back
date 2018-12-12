/**
 * Represents a japanese word
 */
class Word {
	/**
	 * Creates a word
	 * @param kanjiWritings The writings in kanji
	 * @param kanaWritings The writings in kana
	 * @param romajiWritings The writings in romaji
	 * @param definitions The definitions of the word
	 */
    constructor(kanjiWritings, kanaWritings, romajiWritings, definitions) {
        this.kanjiWritings = kanjiWritings;
        this.kanaWritings = kanaWritings;
        this.romajiWritings = romajiWritings; 
        this.definitions = definitions;
    }
}

module.exports = Word;