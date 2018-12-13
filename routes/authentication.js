const express = require('express');
const router = express.Router();

const User = require('../models/User');
const UserDAO = require('../models/UserDAO');
const PasswordUtils = require('../utils/PasswordUtils');
const Exception = require('../models/Exception');

router.get('/', function(req, res){
	res.send('oof');
});

router.post('/accessToken', async function(req, res){
	try {
		await (new UserDAO()).verifyPasswordHash(req.body.login, req.body.password);
	}
	catch(err) {
		res.status(err.code).send(err);
		return;
	}

	const token = PasswordUtils.generateToken();
	const tokenStore = require('../models/TokenStore');
	tokenStore.store(req.body.login, token);

	res.status(200).send({ accessToken: token });
});

router.post('/user', async function(req, res){
    const user = new User(null, req.body.login, req.body.password);
    await (new UserDAO()).createUser(user);

	res.status(200).send();
});

module.exports = router;