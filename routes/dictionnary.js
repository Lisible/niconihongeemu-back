let express = require('express');
let fetch = require('node-fetch');
let router = express.Router();

router.get('/any/:query', function(req, res){
    const ANY_TARGET = 'https://api.nihongoresources.com/dict/find/' + req.params.query;
    fetch(ANY_TARGET)
    .then(response => response.json())
    .then(response => res.send(response));
});

module.exports = router;