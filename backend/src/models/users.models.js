const fs = require('fs');
const jwt = require('jsonwebtoken');
const connect = require('./connection');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');
const errorConstructor = require('../utils/functions/errorHandling');
const { conflict, notFound, badRequest } = require('../utils/dictionary/statusCode');
const hash = require('../utils/hash');

const userCreate = async (user) => {
  const conn = await connect();
  const { name, email, password } = user;
  const findUser = await conn.collection('users').findOne({ email });
  if (findUser) throw errorConstructor(conflict, 'Email already registered');
  const passwordhashed = hash(password);
  const { insertedId } = await conn.collection('users')
    .insertOne({ name, email, password: passwordhashed });
  const newUser = {
    _id: insertedId,
    name: user.name,
    email: user.email,
  };
  return newUser;
};

const userLogin = async (user) => {
  const conn = await connect();

  const { email, password } = user;

  const userAnswer = await conn.collection('users').findOne({ email });
  console.log('usuário', userAnswer);
    
  if (!userAnswer) throw errorConstructor(notFound, 'Usuário não encontrado');
  
  const verifyPassword = hash(password);
  
  if (verifyPassword !== userAnswer.password) {
     throw errorConstructor(badRequest, 'email ou senha inválidos');
  }
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const token = jwt.sign({ data: email }, secret, jwtConfig);

  const userToReturn = {
    name: userAnswer.name,
    id: userAnswer.id,
    email: userAnswer.email,
    token,
  };

  return userToReturn;
};

module.exports = {
  userCreate,
  userLogin,
};
