const connect = require('./connection');

const featurePoints = async (email, point) => {
  const conn = await connect();
  const findPoints = await conn.collection('points').findOne({ email });
  let response = {};
  
  if (findPoints) {
    const points = [...findPoints.points, point];
    response = await conn.collection('points').updateOne({ email }, { $set: { points } });  
  } else {
    const points = [point];
    response = await conn.collection('points').insertOne({ email, points });
  }
  return response;
};

const getPoints = async (email) => {
  const conn = await connect();
  const points = await conn.collection('points').findOne({ email });
  return points;
};

module.exports = {
  featurePoints,
  getPoints,
};
