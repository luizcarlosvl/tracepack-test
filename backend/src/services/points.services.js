const models = require('../models/points.models');

const featurePoints = async (email, point) => {
  const newPoint = await models.featurePoints(email, point);
  
  return newPoint;
};

const getPoints = async (email) => {
  const points = await models.getPoints(email);
  
  return points;
};

module.exports = {
  featurePoints,
  getPoints,
};