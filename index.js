const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/dictionnary/word/', function(req, res) {
    fetch("https://api.nihongoresources.com/dict/find/potato")
    .then(res => console.log(res.json()))
    .then(data => console.log(data))
    .catch(err => console.log(err));
});

app.listen(8080, function(){

});
