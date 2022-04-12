const connect = require('./connection');

const featurePolygons = async (email, polygon) => {
  const conn = await connect();
  const findPolygons = await conn.collection('polygons').findOne({ email });
  let response = {};

  if (findPolygons) {
    const polygons = [...findPolygons.polygons, polygon];
    response = await conn.collection('polygons').updateOne({ email }, { $set: { polygons } });  
  } else {
    const polygons = [polygon];
    response = await conn.collection('polygons').insertOne({ email, polygons });  
  }
   
  return response;
};

const getPolygons = async (email) => {
  const conn = await connect();
  const polygons = await conn.collection('polygons').findOne({ email });
  return polygons;
};

module.exports = {
  featurePolygons,
  getPolygons,
};
