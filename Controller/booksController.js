function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }
    book.save();
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    /* Because of the empty array it returns when there's no query eg ?123= found,
     we have to mk d query an empy object */
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    // Filtering with a query string, req provides 'query' method;

    Book.find(query, (err, books) => {
      if (err) { return res.send(err); }
      return res.json(books);
    });
  }

  return { post, get };
}

module.exports = booksController;
