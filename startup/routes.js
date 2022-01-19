const express = require('express');
const genres = require('../routes/genres');
const books = require('../routes/books');
const sales = require('../routes/sales');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/books', books);
  app.use('/api/sales', sales);
  app.use('/uploads', express.static('uploads'))
  app.use(error);
}