const Joi = require('joi');

const models = require('../models/users.models');
const { badRequest } = require('../utils/dictionary/statusCode');

const errorConstructor = require('../utils/functions/errorHandling');

const errorMessage = 'Invalid entries. Try again.';

const userSchema = Joi.object({
  name: Joi.string().min(1).required().error(new Error(errorMessage)),
  email: Joi.string().email().required().error(new Error(errorMessage)),
  password: Joi.string().min(1).required().error(new Error(errorMessage)),
  
});

const userCreate = async (newUser) => {
  const { error } = userSchema.validate(newUser);

  const code = 'invalid_data';

  if (error) throw errorConstructor(badRequest, error.message, code);

  const user = await models.userCreate(newUser);
  
  return user;
};

const userLogin = async (user) => {
  const userAnswer = await models.userLogin(user);
  
  return userAnswer;
};

module.exports = {
  userCreate,
  userLogin,
};