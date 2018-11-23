class Kanji {
    constructor(literal, readings, meanings, strokeCount, jlptLevel) {
        this.literal = literal;
        this.readings = readings;
        this.meanings = meanings;
        this.strokeCount = strokeCount;
        this.jlptLevel = jlptLevel;
    }
}

module.exports = Kanji;