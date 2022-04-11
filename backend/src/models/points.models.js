const connect = require('./connection');

const featurePoints = async (email, point) => {
  const conn = await connect();
  const findPoints = await conn.collection('points').findOne({ email });
  console.log(findPoints.points);
  const points = [...findPoints.points, point];
  const response = await conn.collection('points').updateOne({ email }, { $set: { points } });
  
  return response;
};

const getPoints = async (email) => {
  const conn = await connect();
  const points = await conn.collection('points').findOne({ email });
  console.log(points);
  return points;
};

module.exports = {
  featurePoints,
  getPoints,
};
