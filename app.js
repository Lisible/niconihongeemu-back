const express = require('express')
const app = express();

let authenticationRouter = require('./routes/authentication');
let dictionnaryRouter = require('./routes/dictionnary');
let deckRouter = require('./routes/deck');

app.use('/authentication', authenticationRouter)
app.use('/dictionnary', dictionnaryRouter);
app.use('/deck', deckRouter);