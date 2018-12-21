const express = require('express');
const fetch = require('node-fetch');
const Word = require('../models/Word');
const Kanji = require('../models/Kanji');
const KanaUtils = require('../utils/KanaUtils');
const router = express.Router();

const PasswordUtils = require('../utils/PasswordUtils');
const SessionUtils = require('../utils/SessionUtils');


router.use(PasswordUtils.authentificationCheck);
router.use(SessionUtils.refresh);
router.get('/any/:query', function(req, res){
    const ANY_TARGET = 'https://api.nihongoresources.com/dict/find/' + req.params.query;
    fetch(ANY_TARGET)
    .then(response => response.json())
    .then(response => res.send(response))
    .catch(err => console.log(err));
    
});

router.get('/kanji/:query', function(req, res){
	const KANJI_TARGET = "https://api.nihongoresources.com/kanji/find/" + encodeURIComponent(req.params.query);
	fetch(KANJI_TARGET)
	.then(response => response.json())
	.then(response => {
        let kanjiList = parseKanjiResponse(response);
        res.send(kanjiList);
    })
    .catch(err => console.log(err));
});

router.get('/word/:query', function(req, res){
    const ANY_TARGET = 'https://api.nihongoresources.com/dict/find/' + encodeURIComponent(req.params.query);
    fetch(ANY_TARGET)
    .then(response => response.json())
    .then(response => {
        let wordDefinitions = parseWordResponse(response);
        res.send(wordDefinitions);
    })
    .catch(err => console.log(err));
});


function parseWordResponse(response) {
    let definitions = [];

    response.forEach(r => {
        if(r.sense !== undefined) {
            meanings = r.sense.reduce((accum, curr) => {
                accum = accum.concat(curr.gloss)
                return accum;
            }, []);

            romajiWritings = r.reb.map(w => KanaUtils.toRomaji(w));
            definitions.push(new Word(r.keb,
                                    r.reb,
                                    romajiWritings,
                                    meanings));
        }
    });

    return definitions;
}

function parseKanjiResponse(response) {
    let kanjiList = [];

    response.forEach(r => {
        if(r.literal != undefined){
            if(r.jlpt != undefined){
                jlptLevel =  r.jlpt;
            }
            else jlptLevel = null;
            romaji = r.readings.map(w => KanaUtils.toRomaji(w));
            kanjiList.push(new Kanji(r.literal, r.readings, r.meanings, romaji, r.strokeCount, jlptLevel));
        }
    })

    return kanjiList;
}

module.exports = router;