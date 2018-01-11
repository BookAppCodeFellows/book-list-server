'use strict';
// REVIEW: Check out all of our new arrow function syntax!

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'postgress://localhost:5432/books_app'
const cors = require('cors');
const app = express();
const client = new pg.Client(DATABASE_URL);

client.connect();
app.use(cors());

client.on('error', err => {
  console.error(err);
 });

app.get('/api/v1/books', (req, res) => {
    client.query(`
      SELECT id, title, author, image_url FROM books;  
    `
    ).then(result => res.send(result.rows))
    .catch(error => console.error(error))
});

app.get('/api/v1/books/:id', (req, res) => {
  client.query(`
    SELECT * FROM books WHERE id=${req.params.id} 
  `).then(result => res.send(result.rows[0]))
  .catch(error => console.error(error))
});

app.post('/api/v1/books', express.json(), express.urlencoded({extended: true}), (req, res) => {
  client.query(`
    INSERT INTO books (title, author, image_url, isbn, description)
    VALUES($1, $2, $3, $4, $5)
  `, [
       req.body.title,
       req.body.author,
       req.body.image_url,
       req.body.isbn,
       req.body.description
     ]
  ).then(result => res.send('Inserted successfully'))
  .catch(error => console.error(error))
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
