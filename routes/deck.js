const express = require('express');
const shortid = require('shortid');
const MongoClient = require('mongodb').MongoClient;
const router = express.Router();

const Deck = require('../models/deck');

const MONGO_URL = 'mongodb://localhost:27017';

router.post('/', async (req, res) => {
	let id = ''; 

	id = shortid.generate();
	while(await idAlreadyExists(id))
		id = shortid.generate();

	const deck = new Deck(id, req.body.name, req.body.cardList);
	const client = await MongoClient.connect(MONGO_URL, {
		useNewUrlParser: true
	});
	const db = client.db('niconihongeemu');	
	const deckCollection = db.collection('deck');
	deckCollection.insertOne(deck)
		.then(() => console.log('Deck added'))
		.catch(() => console.log('Deck not added'));

	res.status(200);
	res.send();
});

async function idAlreadyExists(id) {
	const client = await MongoClient.connect(MONGO_URL, {
		useNewUrlParser: true
	});

	const db = client.db('niconihongeemu');	
	const deckCollection = db.collection('deck');
	const count = await deckCollection.countDocuments(
			{ $expr: { $eq: ['$id', id] }}
	);

	return count !== 0;
}

module.exports = router;