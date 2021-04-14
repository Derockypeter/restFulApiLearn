const should = require('should');
const sinon = require('sinon');
const bookController = require('../Controller/booksController');

describe('Book Controller Test:', () => {
  describe('Post', () => {
    it('Should not submit without a title', () => {
      const Book = function (book) { this.save = () => {}; };

      const req = {
        body: {
          author: 'Somee',
        },
      };

      // Using sinon to mock out the data(response)
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),

      };
      const controller = bookController(Book);

      controller.post(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
