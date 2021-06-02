import Ajv from 'ajv';

const ajv = new Ajv();

const createOneSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
  },
  required: ['name', 'description'],
};

const validateCreateOne = ajv.compile(createOneSchema);

const createOne = (req, res, next) => {
  console.log('- validator createOne req.body -', req.body);

  const valid = validateCreateOne(req.body);

  if (!valid) {
    console.log('- validate.errors -', validate.errors);
    throw new Error(validate.errors);
  }

  next();
};

export default { createOne };
