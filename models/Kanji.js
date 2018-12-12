/**
 * Represents a Kanji
 */
class Kanji {
    /**
     * Creates a kanji
     * @param literal The character representing the kanji
     * @param readings The list of readings (in kana)
     * @param meanings The list of meanings
     * @param strokeCount The number of strokes required to draw the kanji
     * @param jlptLevel The JLPT level where this kanji can be encountered
     */
    constructor(literal, readings, meanings, romaji, strokeCount, jlptLevel) {
        this.literal = literal;
        this.readings = readings;
        this.meanings = meanings;
        this.romaji = romaji;
        this.strokeCount = strokeCount;
        this.jlptLevel = jlptLevel;
    }
}

module.exports = Kanji;