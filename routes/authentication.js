const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
	res.send('oof');
});

router.post('/accessToken', function(req, res){
    res.send('Hello '  + req.query.login);
});

router.post('/user', function(req, res){
    res.send('Register');
});

module.exports = router;