# NicoNihonGeemu *バックエンド　！！！*
NodeJS backend for NicoNihonGeemu

Start with ``npm start`` or ``node app.js``

## Confiiguration
The NicoNihonGeemu backend requires an environment variable to be set in order to access the MongoDB database.
- ``DB_URL``: The MongoDB URI with login/pass and database name matching this format: ``mongodb://<dbuser>:<dbpassword>@<domain>>/<dbname>``

To check if the backend is running, try to access its domain with a web browser, it should display "It works !".

## Architecture
The routes are divided in 3 files: 
- ``routes/authentication``: The routes used to sign in/up 
- ``routes/deck``: The routes for manipulating decks
- ``routes/dictionary``: The routes for fetching dictionary data

To decouple the logic from the routes, several model classes have been created in ``models/``

## Technologies
- node
- express.js
- mongodb
