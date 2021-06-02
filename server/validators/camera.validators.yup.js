import * as yup from 'yup';

// const schema = Yup.object({
//   name: Yup.string().required(),
//   description: Yup.string().required(),
//   rtspLink: Yup.string().required(),
// });

const createOne = (req, res, next) => {
  console.log('- validator createOne req.body -', req.body);

  // schema.validateSync(req.body);

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
