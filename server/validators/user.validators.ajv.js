import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const singUpSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'password' },
  },
  required: ['email', 'password'],
};

const singUp = (req, res, next) => {
  // console.log('- user.validator singUp req.body -', req.body);

  const singUpValidate = ajv.compile(singUpSchema);
  const valid = singUpValidate(req.body);

  if (!valid) {
    console.log('- singUpValidate.errors -', singUpValidate.errors);
    throw new Error(singUpValidate.errors);
  }

  next();
};

const logInSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'password' },
  },
  required: ['email', 'password'],
};

const logIn = (req, res, next) => {
  // console.log('- validator getOne req.params -', req.params);

  const logInValidate = ajv.compile(logInSchema);
  const valid = logInValidate(req.body);

  if (!valid) {
    console.log('- singUpValidate.errors -', logInValidate.errors);
    throw new Error(logInValidate.errors);
  }

  next();
};

export default { singUp, logIn };
