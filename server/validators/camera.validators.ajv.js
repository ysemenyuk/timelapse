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

const getOneSchema = {
  type: "string", maxLength: 24, minLength: 24
};

const validateGeteOne = ajv.compile(getOneSchema);

const getOne = (req, res, next) => {
  console.log('- validator getOne req.params -', req.params);

  const valid = validateGeteOne(req.params.id);

  if (!valid) {
    console.log('- validate.errors -', validateGeteOne.errors);
    throw new Error(validateGeteOne.errors);
  }

  next();
};

export default { getOne, createOne };
