const express = require('express');
const router = express.Router();

const DeckDAO = require('../models/DeckDAO');
const Deck = require('../models/Deck');
const TokenStore = require('../models/TokenStore');

const CardDAO = require('../models/CardDAO');
const Card = require('../models/Card');

const PasswordUtils = require('../utils/PasswordUtils');
const SessionUtils = require('../utils/SessionUtils');

router.use(PasswordUtils.authentificationCheck);
router.use(SessionUtils.refresh);
router.post('/', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
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

router.delete('/:id', async (req, res) => {
	await (new DeckDAO()).deleteDeck(req.params.id);
	res.status(200);
	res.send();
});

router.put('/:id', async (req, res) => {
	await (new DeckDAO()).modifyDeckName(req.params.id, req.body.name);
	res.status(200);
	res.send();
});

router.get('/:id/cards', async (req, res) => {
	const cardList = await (new DeckDAO()).getCardListFromDeck(req.params.id);
	res.status(200);
	res.send(cardList);
});

router.get('/:idD/cards/:idC', async (req, res) => {
	const cardList = await (new DeckDAO()).getCardListFromDeck(req.params.idD);
	let card;
	cardList.forEach(c => {
		if(c.id === req.params.idC)
			card = c;
	});
	res.status(200);
	res.send(card);
});

router.post('/:id/cards', async (req, res) => {
	let card = new Card(null, req.body.front, req.body.back);
	await (new DeckDAO()).insertCardInDeck(req.params.id, card);

	res.status(200);
	res.send();
});

router.delete('/:idD/cards/:idC', async (req, res) => {
	await (new DeckDAO()).deleteCardFromDeck(req.params.idD, req.params.idC);
	res.status(200);
	res.send();
});

router.put('/:idD/cards/:idC', async (req, res) => {
	await (new DeckDAO()).updateCard(req.params.idD, req.params.idC, req.body.front, req.body.back);
	res.status(200);
	res.send();
});

module.exports = router;