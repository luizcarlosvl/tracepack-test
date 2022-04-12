const { created, success } = require('../utils/dictionary/statusCode');
const services = require('../services/polygons.services');

const featurePolygons = async (req, res, next) => {
  try {
    const { email, polygon } = req.body;
    const newPolygon = await services.featurePolygons(email, polygon);
    return res.status(created).json(newPolygon);
  } catch (error) {
    console.log(`POST CREATESALE -> ${error.message}`);
    return next(error);
  }
};

const getPolygons = async (req, res, next) => {
  const { email } = req.params;
  
  try {
    const Polygons = await services.getPolygons(email);
    return res.status(success).json(Polygons);
  } catch (error) {
    console.log(`POST CREATESALE -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  featurePolygons,
  getPolygons, 
};