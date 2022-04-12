const { created, success } = require('../utils/dictionary/statusCode');
const services = require('../services/points.services');

const featurePoints = async (req, res, next) => {
  try {
    const { email, point } = req.body;
    const newPoint = await services.featurePoints(email, point);
    return res.status(created).json(newPoint);
  } catch (error) {
    console.log(`POST CREATESALE -> ${error.message}`);
    return next(error);
  }
};

const getPoints = async (req, res, next) => {
  const { email } = req.params;
  
  try {
    const points = await services.getPoints(email);
    return res.status(success).json(points);
  } catch (error) {
    console.log(`POST CREATESALE -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  featurePoints,
  getPoints, 
};