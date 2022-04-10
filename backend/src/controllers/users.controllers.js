const { created, success } = require('../utils/dictionary/statusCode');
const services = require('../services/users.services');

const userCreate = async (req, res, next) => {
  try {
    const newUser = req.body;
    const user = await services.userCreate(newUser);

    return res.status(created).json({ user });
  } catch (error) {
    console.log(`POST CREATESALE -> ${error.message}`);
    return next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const newUser = req.body;
    const user = await services.userLogin(newUser);

    return res.status(success).json({ user });
  } catch (error) {
    console.log(`POST CREATESALE -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  userCreate,
  userLogin,  
};