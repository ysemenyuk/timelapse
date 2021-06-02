import validator from 'validator';

const createOne = (req, res, next) => {
  console.log('- validator createOne req.body -', req.body);

  if (!req.body) {
    throw new Error('no body');
  }

  next();
};

const getOne = (req, res, next) => {
  console.log('- validator getOne req.params -', req.params);

  if (!validator.isMongoId(req.params.id)) {
    throw new Error('must be an id!');
  }

  next();
};

export default { getOne, createOne };
