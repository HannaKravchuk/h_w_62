function errorHandler(err, req, res, next) {
  console.error('ERROR:', err.message);
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
}

module.exports = errorHandler;
