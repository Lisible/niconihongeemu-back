let express = require('express');
let fetch = require('node-fetch');
let Word = require('../models/word');
let router = express.Router();

router.get('/any/:query', function(req, res){
    const ANY_TARGET = 'https://api.nihongoresources.com/dict/find/' + req.params.query;
    fetch(ANY_TARGET)
    .then(response => response.json())
    .then(response => {
    });
});

router.get('/word/:query', function(req, res){
    const ANY_TARGET = 'https://api.nihongoresources.com/dict/find/' + req.params.query;
    fetch(ANY_TARGET)
    .then(response => response.json())
    .then(response => {
        let wordDefinitions = parseWordResponse(response);
        res.send(wordDefinitions);
    });
});


function parseWordResponse(response) {
    let definitions = [];

    response.forEach(r => {
        if(r.sense !== undefined) {
            meanings = r.sense.reduce((accum, curr) => {
                accum = accum.concat(curr.gloss)
                return accum;
            }, []);
        }

        definitions.push(new Word(r.keb,
                                r.reb,
                                meanings));
    });

    return definitions;
}

module.exports = router;