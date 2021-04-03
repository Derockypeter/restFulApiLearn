const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./Model/bookModel');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Filtering with a query string, req provides 'query' method;
bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    console.log(book);
    res.json(book);
  })
  .get((req, res) => {
    // Because of the empty array it returns when there's no query eg ?123= found, we have to mk d query an empy object
    const query = {};
    if (req.query.genre){
      query.genre = req.query.genre
    }
    Book.find(query, (err, books) => {
      if (err) { return res.send(err); }
      return res.json(books);
    });
  });

// Gets single Item by ID
bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) { return res.send(err); }
      return res.json(book)
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
