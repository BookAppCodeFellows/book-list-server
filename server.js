'use strict';
// REVIEW: Check out all of our new arrow function syntax!

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const DATABASE_URL = process.env.DATABASE_URL || 'postgress://localhost:5432/books_app'
const cors = require('cors');
const app = express();
const client = new pg.Client(DATABASE_URL);

client.connect();
app.use(cors());

client.on('error', err => {
  console.error(err);
 });

app.get('/books', (req, res) => {
    client.query(`
      SELECT * FROM books;  
    `
    ).then(result => res.send(result.rows))
    .catch(error => console.error(error))
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
