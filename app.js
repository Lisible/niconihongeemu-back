const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

let authenticationRouter = require('./routes/authentication');
let dictionnaryRouter = require('./routes/dictionnary');
let deckRouter = require('./routes/deck');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/authentication', authenticationRouter)
app.use('/dictionnary', dictionnaryRouter);
app.use('/deck', deckRouter);

setup();

app.listen(3000, function(){
  console.log('NicoNihonGeemu backend started on port 3000');
});

function setup() {
	const config = require('./config.json');
	require('./models/Database').initialize(process.env.DB_URL, process.env.DB);
}
