const express = require('express');
const router = express.Router();

const DeckDAO = require('../models/DeckDAO');
const Deck = require('../models/Deck');
const TokenStore = require('../models/TokenStore');

const PasswordUtils = require('../utils/PasswordUtils');
const SessionUtils = require('../utils/SessionUtils');

router.use(PasswordUtils.authentificationCheck);
router.use(SessionUtils.refresh);
router.post('/', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	console.log(login);
	const deck = new Deck(null, req.body.name, req.body.cardList, login);
	await (new DeckDAO()).insertDeck(deck);

	res.status(200);
	res.send();
});

router.get('/', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	const decks = await (new DeckDAO()).fetchUserDecks(login);
	res.status(200);
	res.send(decks);
});

router.get('/:id', async (req, res) => {
	const deck = await (new DeckDAO()).fetchDeck(req.params.id);
	res.status(200);
	res.send(deck);
});

module.exports = router;