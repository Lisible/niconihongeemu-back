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
	 */
	async insertDocument(collectionName, document) {
		let id = DBUtils.generateId();
		while(await this._checkIdentifierExistence('deck', id))
			id = DBUtils.generateId();

		document.id = id;

		const collection = this.db.collection(collectionName);
		return collection.insertOne(document)
	}

	async findDocumentsByValue(collectionName, propertyName, propertyValue) {
		let queryObject = {};
		queryObject[propertyName] = propertyValue;

		return this.db.collection(collectionName).find(queryObject).toArray();
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
      		{ $set: { "name" : name } },
		);
	}
}

module.exports = new Database();