const models = require('../models/polygons.models');

const featurePolygons = async (email, polygon) => {
  const newPolygon = await models.featurePolygons(email, polygon);
  return newPolygon;
};

const getPolygons = async (email) => {
  const Polygons = await models.getPolygons(email);
  return Polygons;
};

module.exports = {
  featurePolygons,
  getPolygons,
};