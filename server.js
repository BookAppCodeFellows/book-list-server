'use strict';
// REVIEW: Check out all of our new arrow function syntax!

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const app = express();
const conString = 'postgres://localhost:5432/book_app';
const client = new pg.Client(conString);

app.use(cors());

client.connect();
client.on('error', err => {
  console.error(err);
 });

app.get('/test', (req, res) => res.send('Hellow World'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
