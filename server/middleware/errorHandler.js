const errorHandler = (err, req, res, next) => {
  // res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
  throw new Error(err);
};

module.exports = errorHandler;
