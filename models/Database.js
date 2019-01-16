const MongoClient = require('mongodb').MongoClient;
const DBUtils = require('../utils/DBUtils');

class Database {
	/**
	 * Initializes the database object used by the app
	 * @param url URL of the database server to use
	 * @param databaseName Name of the database
	 */
	async initialize(url, databaseName) {
		this.url = url;
		this.databaseName = databaseName;
		await this._connect();
	}

	/**
	 * @return The URL of the database server
	 */
	getURL() {
		return this.url;
	}

	/**
	 * @return The name of the database to use
	 */
	getDatabaseName() {
		return this.databaseName;
	}

	/**
	 * Inserts a document in the database
	 * @param collectionName The name of the collection to insert the document into
	 * @param document The document to insert
	 * @return The identifier of the added document
	 */
	async insertDocument(collectionName, document) {
		let id = DBUtils.generateId();
		while(await this._checkIdentifierExistence('deck', id))
			id = DBUtils.generateId();

		document.id = id;

		const collection = this.db.collection(collectionName);
		collection.insertOne(document)
		return id;
	}

	async findDocumentsByValue(collectionName, propertyName, propertyValue) {
		let queryObject = {};
		queryObject[propertyName] = propertyValue;

		return this.db.collection(collectionName).find(queryObject).toArray();
	}

	async findDocumentByValue(collectionName, propertyName, propertyValue) {
		const documents = await this.findDocumentsByValue(collectionName, propertyName, propertyValue);
		return documents[0];
	}

	async _connect() {
		const client = await MongoClient.connect(this.url, {
			useNewUrlParser: true
		});

		this.db = client.db(this.databaseName);
	}

	async _checkIdentifierExistence(collectionName, identifier) {
		const collection = this.db.collection(collectionName);
		const count = await collection.countDocuments(
			{ $expr: { $eq: ['$id', identifier] }}
		);

		return count !== 0;
	}

	async deleteDocumentWithId(collectionName, id) {
		const collection = this.db.collection(collectionName);
		return collection.deleteOne( { "id" : id } );
	}

	async updateDocumentName(collectionName, id, name) {
		const collection = this.db.collection(collectionName);
		collection.updateOne(
      		{ "id" : id },
      		{ $set: {"name" : name } },
		);
	}

	async updateDocumentCardList(collectionName, id, cardList) {
		const collection = this.db.collection(collectionName);
		collection.updateOne(
      		{ "id" : id },
      		{ $set: { "cardList" : cardList } },
		);
	}
}

module.exports = new Database();
