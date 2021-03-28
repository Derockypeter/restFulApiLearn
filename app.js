const express = require('express');

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

bookRouter.route('/books').get((req, res) => {
  const response = { book: 'Becoming a better you' };
  res.json(response);
});

app.use('/api', bookRouter);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
