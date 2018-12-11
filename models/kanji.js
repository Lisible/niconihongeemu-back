class Kanji {
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