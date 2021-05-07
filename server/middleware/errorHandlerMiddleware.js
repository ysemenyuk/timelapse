const errorHandler = (err, req, res, next) => {
  console.log('errorHandler -', err);
  return res.status(500).send(err.message);
};

export { errorHandler };