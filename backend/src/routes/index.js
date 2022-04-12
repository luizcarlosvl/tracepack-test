const express = require('express');

const userControllers = require('../controllers/users.controllers');
const pointsController = require('../controllers/points.controllers');
const polygonsController = require('../controllers/polygons.controllers');

const router = express.Router();

router.post('/register', userControllers.userCreate);

router.post('/login', userControllers.userLogin);

router.post('/points', pointsController.featurePoints);

router.post('/polygons', polygonsController.featurePolygons);

router.get('/points/:email', pointsController.getPoints);

router.get('/polygons/:email', polygonsController.getPolygons);

module.exports = router;