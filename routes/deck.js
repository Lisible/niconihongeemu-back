const express = require('express');
const router = express.Router();

const DeckDAO = require('../models/DeckDAO');
const Deck = require('../models/Deck');
const TokenStore = require('../models/TokenStore');

const Card = require('../models/Card');

const PasswordUtils = require('../utils/PasswordUtils');
const SessionUtils = require('../utils/SessionUtils');

router.use(PasswordUtils.authentificationCheck);
router.use(SessionUtils.refresh);
router.post('/', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	const deck = new Deck(null, req.body.name, req.body.cardList, login);
	try {
    	await (new DeckDAO()).insertDeck(deck);
		res.status(200).send();
    } catch(err) {
    	res.status(err.code).send(err);
    }
});

router.get('/', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	const decks = await (new DeckDAO()).fetchUserDecks(login);
	res.status(200);
	res.send(decks);
});

router.get('/:id', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	try {
		const deck = await (new DeckDAO()).fetchDeck(req.params.id, login);
		res.status(200).send(deck);
	}
	catch (err) {
		res.status(err.code).send(err);
	}
});

router.delete('/:id', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	try {
		await (new DeckDAO()).deleteDeck(req.params.id, login);
		res.status(200).send();
	} catch (err) {
		res.status(err.code).send(err);
	}
});

router.put('/:id', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	try {
		await (new DeckDAO()).modifyDeckName(req.params.id, req.body.name, login);
		res.status(200).send();
	} catch(err) {
		res.status(err.code).send(err);
	}
});

router.get('/:id/cards', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	try {
		const cardList = await (new DeckDAO()).getCardListFromDeck(req.params.id, login);
		res.status(200).send(cardList);
	} catch(err) {
		res.status(err.code).send(err);
	}
});

router.get('/:idD/cards/:idC', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	try {
		const card = await (new DeckDAO()).getCardFromDeck(req.params.idD, req.params.idC, login);
		res.status(200).send(card);
	} catch(err) {
		res.status(err.code).send(err);
	}
});

router.post('/:id/cards', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	try {
		const card = new Card(null, req.body.front, req.body.back);
		await (new DeckDAO()).insertCardInDeck(req.params.id, card, login);
		res.status(200).send(card);
	} catch(err) {
		res.status(err.code).send(err);
	}
});

router.delete('/:idD/cards/:idC', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	try {
		await (new DeckDAO()).deleteCardFromDeck(req.params.idD, req.params.idC, login);
		res.status(200).send();
	} catch(err) {
		res.status(err.code).send(err);
	}
});

router.put('/:idD/cards/:idC', async (req, res) => {
	const login = TokenStore.getLoginFromToken(req.query.access_token);
	try {
	await (new DeckDAO()).updateCard(req.params.idD, req.params.idC, req.body.front, req.body.back, req.body.nextRevisionDate, req.body.streak, login);
		res.status(200).send();
	} catch(err) {
		res.status(err.code).send(err);
	}
});

module.exports = router;