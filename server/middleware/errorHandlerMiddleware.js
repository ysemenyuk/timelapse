class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.status = '400';
  }
}

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('- errorHandler -', err);

  if (err instanceof BadRequestError) {
    return res.status(err.status).send({ message: err.message });
  }

  return res.status(500).send({ message: err.message });
};

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

export { asyncHandler, errorHandlerMiddleware, BadRequestError };
