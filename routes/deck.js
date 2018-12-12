const express = require('express');
const router = express.Router();

const DeckDAO = require('../models/DeckDAO');
const Deck = require('../models/Deck');

router.post('/', async (req, res) => {
	const deck = new Deck(null, req.body.name, req.body.cardList);
	await (new DeckDAO()).insertDeck(deck);

	res.status(200);
	res.send();
});

module.exports = router;