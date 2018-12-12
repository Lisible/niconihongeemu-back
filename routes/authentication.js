const express = require('express');
const router = express.Router();

const User = require('../models/User');
const UserDAO = require('../models/UserDAO');

router.get('/', function(req, res){
	res.send('oof');
});

router.post('/accessToken', function(req, res){
    res.send('Hello '  + req.query.login);
});

router.post('/user', async function(req, res){
    const user = new User(null, req.body.login, req.body.password);
    await (new UserDAO()).createUser(user);

	res.status(200);
	res.send();
});

module.exports = router;